import { NextResponse } from 'next/server';
import { getReportById, saveFullReport } from '@/lib/db/reports';
import { generateFullReport } from '@/lib/llm/generateFullReport';
import { isDemoMode } from '@/lib/demo';
import { getFullReportFallback } from '@/lib/mock/fullReportFallback';
import { getLocalReportById, saveLocalFullReport, unlockLocalReport } from '@/lib/db/localReports';

export async function POST(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const demoMode = isDemoMode();
  const report = demoMode ? await getLocalReportById(id) : await getReportById(id);
  if (!report) return NextResponse.json({ error: 'Report not found' }, { status: 404 });

  if (report.status === 'preview_ready' && demoMode) {
    await unlockLocalReport(id);
  }

  if (demoMode) {
    if (report.full_json) {
      return NextResponse.json({ report, unlocked: true, demoMode: true });
    }

    const full = getFullReportFallback(report);
    const saved = await saveLocalFullReport(id, full);
    return NextResponse.json({ report: saved, unlocked: true, demoMode: true });
  }

  const refreshed = await getReportById(id);
  if (!refreshed) return NextResponse.json({ error: 'Report not found' }, { status: 404 });
  if (!demoMode && refreshed.status !== 'paid' && refreshed.status !== 'full_ready') {
    return NextResponse.json({ error: 'Payment required before full report generation' }, { status: 402 });
  }

  if (refreshed.full_json) {
    return NextResponse.json({ report: refreshed, unlocked: true });
  }

  const full = await generateFullReport(refreshed);
  const saved = await saveFullReport(id, full);
  return NextResponse.json({ report: saved, unlocked: true });
}
