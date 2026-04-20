import { NextResponse } from 'next/server';
import { getReportById } from '@/lib/db/reports';
import { isDemoMode } from '@/lib/demo';
import { getLocalReportById } from '@/lib/db/localReports';

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const demoMode = isDemoMode();
  const report = demoMode ? await getLocalReportById(id) : await getReportById(id);
  if (!report) return NextResponse.json({ error: 'Report not found' }, { status: 404 });
  const unlocked = demoMode || report.status === 'paid' || report.status === 'full_ready';
  return NextResponse.json({ report, preview: report.preview_json, full: report.full_json, unlocked, demoMode });
}
