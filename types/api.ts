import type { Report, ReportRecord } from './report';

export interface PreviewResponse {
  reportId: string;
  preview: Partial<Report>;
  storage: 'supabase' | 'local';
}

export interface ReportResponse {
  report: ReportRecord;
  unlocked: boolean;
  preview?: ReportRecord['preview_json'];
  full?: ReportRecord['full_json'];
  demoMode?: boolean;
}
