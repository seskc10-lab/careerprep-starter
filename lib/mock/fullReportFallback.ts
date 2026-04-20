import type { ReportRecord } from '@/types/report';
import { previewFallback } from './previewFallback';

export function getFullReportFallback(_report?: ReportRecord) {
  return previewFallback;
}
