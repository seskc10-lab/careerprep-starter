import crypto from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import type { Report, ReportRecord } from '@/types/report';

const localDbPath = path.join(process.cwd(), 'local_db.json');

type LocalDb = {
  reports: ReportRecord[];
};

async function ensureLocalDb() {
  try {
    await fs.access(localDbPath);
  } catch {
    await fs.writeFile(localDbPath, JSON.stringify({ reports: [] } as LocalDb, null, 2));
  }
}

async function readLocalDb(): Promise<LocalDb> {
  await ensureLocalDb();
  return JSON.parse(await fs.readFile(localDbPath, 'utf8')) as LocalDb;
}

async function writeLocalDb(store: LocalDb) {
  await ensureLocalDb();
  await fs.writeFile(localDbPath, JSON.stringify(store, null, 2));
}

export async function saveLocalPreviewReport(input: {
  userId?: string | null;
  ownerEmail?: string | null;
  cvText: string;
  jobDescription: string;
  companyName?: string | null;
  interviewDate?: string | null;
  preview: Partial<Report>;
}) {
  const store = await readLocalDb();
  const now = new Date().toISOString();
  const report: ReportRecord = {
    id: crypto.randomUUID(),
    user_id: input.userId ?? null,
    owner_email: input.ownerEmail ?? null,
    company_name: input.companyName ?? null,
    interview_date: input.interviewDate ?? null,
    cv_text: input.cvText,
    job_description: input.jobDescription,
    preview_json: input.preview,
    full_json: null,
    status: 'preview_ready',
    created_at: now,
    updated_at: now,
  };

  store.reports.unshift(report);
  await writeLocalDb(store);
  return report;
}

export async function getLocalReportById(id: string) {
  const store = await readLocalDb();
  return store.reports.find((report) => report.id === id) ?? null;
}

export async function unlockLocalReport(id: string) {
  const store = await readLocalDb();
  const report = store.reports.find((entry) => entry.id === id);
  if (!report) return null;

  report.status = report.full_json ? 'full_ready' : 'paid';
  report.updated_at = new Date().toISOString();
  await writeLocalDb(store);
  return report;
}

export async function saveLocalFullReport(id: string, full: Report) {
  const store = await readLocalDb();
  const report = store.reports.find((entry) => entry.id === id);
  if (!report) return null;

  report.full_json = full;
  report.status = 'full_ready';
  report.updated_at = new Date().toISOString();
  await writeLocalDb(store);
  return report;
}
