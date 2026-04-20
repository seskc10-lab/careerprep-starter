import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe/server';
import { getReportById, markReportPaid } from '@/lib/db/reports';
import { isDemoMode } from '@/lib/demo';
import { getLocalReportById, unlockLocalReport } from '@/lib/db/localReports';

export async function POST(request: Request) {
  const body = await request.json();
  const reportId = body.reportId as string;
  if (!reportId) return NextResponse.json({ error: 'reportId is required' }, { status: 400 });
  const demoMode = isDemoMode();
  const report = demoMode ? await getLocalReportById(reportId) : await getReportById(reportId);
  if (!report) return NextResponse.json({ error: 'Report not found' }, { status: 404 });

  const appBase = process.env.APP_BASE_URL ?? 'http://localhost:3000';
  if (demoMode) {
    await unlockLocalReport(reportId);
    return NextResponse.json({ url: `${appBase}/success?demo=1&reportId=${reportId}` });
  }

  const stripe = getStripe();
  const priceId = process.env.STRIPE_PRICE_ID_ONE_TIME ?? process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;
  if (!stripe || !priceId) {
    await markReportPaid(reportId);
    return NextResponse.json({ url: `${appBase}/success?reportId=${reportId}&demo=1` });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appBase}/success?reportId=${reportId}`,
    cancel_url: `${appBase}/cancel`,
    metadata: { report_id: reportId, user_id: report.user_id ?? '' },
  });

  return NextResponse.json({ url: session.url });
}
