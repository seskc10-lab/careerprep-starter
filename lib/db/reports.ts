import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import type { Report, ReportRecord } from '@/types/report';
import { getServiceSupabase } from '@/lib/supabase/server';

const dataPath = path.join(process.cwd(), '.data', 'reports.json');

type LocalStore = { reports: ReportRecord[] };

async function ensureStore() {
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  try {
    await fs.access(dataPath);
  } catch {
    await fs.writeFile(dataPath, JSON.stringify({ reports: [] } as LocalStore, null, 2));
  }
}

async function readLocal(): Promise<LocalStore> {
  await ensureStore();
  return JSON.parse(await fs.readFile(dataPath, 'utf8')) as LocalStore;
}

async function writeLocal(store: LocalStore) {
  await ensureStore();
  await fs.writeFile(dataPath, JSON.stringify(store, null, 2));
}

export async function createPreviewReport(input: {
  userId?: string | null;
  ownerEmail?: string | null;
  cvText: string;
  jobDescription: string;
  companyName?: string | null;
  interviewDate?: string | null;
  preview: Partial<Report>;
}) {
  const supabase = getServiceSupabase();
  if (supabase && input.userId) {
    const payload = {
      user_id: input.userId,
      company_name: input.companyName ?? null,
      interview_date: input.interviewDate ?? null,
      cv_text: input.cvText,
      job_description: input.jobDescription,
      match_score: input.preview.match_score ?? null,
      match_band: input.preview.match_band ?? null,
      summary_verdict: input.preview.summary_verdict ?? null,
      preview_json: input.preview,
      status: 'preview_ready',
    };
    const { data, error } = await supabase.from('reports').insert(payload).select('*').single();
    if (!error && data) return { storage: 'supabase' as const, report: mapSupabaseRow(data) };
  }

  const store = await readLocal();
  const record: ReportRecord = {
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
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  store.reports.unshift(record);
  await writeLocal(store);
  return { storage: 'local' as const, report: record };
}

export async function getReportById(id: string) {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data } = await supabase.from('reports').select('*').eq('id', id).maybeSingle();
    if (data) return mapSupabaseRow(data);
  }
  const store = await readLocal();
  return store.reports.find((r) => r.id === id) ?? null;
}

export async function listReportsByUser(userId?: string | null) {
  const supabase = getServiceSupabase();
  if (supabase && userId) {
    const { data } = await supabase.from('reports').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (data) return data.map(mapSupabaseRow);
  }
  const store = await readLocal();
  return userId ? store.reports.filter((r) => r.user_id === userId) : store.reports.slice(0, 20);
}

export async function saveFullReport(id: string, full: Report) {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase.from('reports').update({ full_json: full, status: 'full_ready', updated_at: new Date().toISOString() }).eq('id', id).select('*').single();
    if (!error && data) return mapSupabaseRow(data);
  }
  const store = await readLocal();
  const idx = store.reports.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  store.reports[idx].full_json = full;
  store.reports[idx].status = 'full_ready';
  store.reports[idx].updated_at = new Date().toISOString();
  await writeLocal(store);
  return store.reports[idx];
}

export async function markReportPaid(id: string) {
  const supabase = getServiceSupabase();
  if (supabase) {
    const { data, error } = await supabase.from('reports').update({ status: 'paid', updated_at: new Date().toISOString() }).eq('id', id).select('*').single();
    if (!error && data) return mapSupabaseRow(data);
  }
  const store = await readLocal();
  const idx = store.reports.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  store.reports[idx].status = 'paid';
  store.reports[idx].updated_at = new Date().toISOString();
  await writeLocal(store);
  return store.reports[idx];
}

function mapSupabaseRow(row: any): ReportRecord {
  return {
    id: row.id,
    user_id: row.user_id,
    owner_email: row.owner_email ?? null,
    company_name: row.company_name ?? null,
    interview_date: row.interview_date ?? null,
    cv_text: row.cv_text,
    job_description: row.job_description,
    preview_json: row.preview_json,
    full_json: row.full_json,
    status: row.status,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
