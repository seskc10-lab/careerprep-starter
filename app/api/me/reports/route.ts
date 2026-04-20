import { NextResponse } from 'next/server';
import { getOptionalUserFromRequest } from '@/lib/utils/auth';
import { listReportsByUser } from '@/lib/db/reports';

export async function GET(request: Request) {
  const user = await getOptionalUserFromRequest(request);
  const reports = await listReportsByUser(user?.id ?? null);
  return NextResponse.json({ reports });
}
