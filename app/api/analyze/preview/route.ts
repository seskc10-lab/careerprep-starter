import { NextResponse } from 'next/server';
import { intakeSchema } from '@/lib/validation/intakeSchema';
import { generatePreview } from '@/lib/llm/generatePreview';
import { createPreviewReport } from '@/lib/db/reports';
import { getOptionalUserFromRequest } from '@/lib/utils/auth';
import { upsertProfile } from '@/lib/db/profiles';
import { isDemoMode } from '@/lib/demo';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = intakeSchema.parse(body);
    const user = isDemoMode() ? null : await getOptionalUserFromRequest(request);

    if (user && !isDemoMode()) {
      await upsertProfile(user.id, input.profile);
    }

    const preview = await generatePreview(input);

    if (isDemoMode()) {
      return NextResponse.json({
        reportId: 'demo-report-001',
        preview,
        storage: 'demo',
      });
    }

    const result = await createPreviewReport({
      userId: user?.id,
      ownerEmail: input.profile.email,
      cvText: input.cvText,
      jobDescription: input.jobDescription,
      companyName: input.company,
      interviewDate: input.interviewDate,
      preview,
    });

    return NextResponse.json({
      reportId: result.report.id,
      preview: result.report.preview_json,
      storage: result.storage,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Preview generation failed' },
      { status: 500 }
    );
  }
}