import { NextResponse } from 'next/server';
import { getOptionalUserFromRequest } from '@/lib/utils/auth';

export async function GET(request: Request) {
  const user = await getOptionalUserFromRequest(request);
  return NextResponse.json({ user: user ? { id: user.id, email: user.email } : null });
}
