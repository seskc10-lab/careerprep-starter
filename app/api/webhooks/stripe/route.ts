import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe/server';
import { markReportPaid } from '@/lib/db/reports';

export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ ok: true, mode: 'demo' });

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  if (!signature) return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Webhook verification failed' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const reportId = session.metadata?.report_id;
    if (reportId) await markReportPaid(reportId);
  }

  return NextResponse.json({ received: true });
}
