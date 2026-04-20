import { z } from 'zod';

export const onboardingSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  stage: z.string().min(1),
  targetRole: z.string().min(1),
  experience: z.string().min(1),
  struggle: z.string().optional(),
});

export const intakeSchema = z.object({
  profile: onboardingSchema,
  cvText: z.string().min(80),
  jobDescription: z.string().min(60),
  company: z.string().optional(),
  interviewDate: z.string().optional(),
});

export type IntakeSchema = z.infer<typeof intakeSchema>;
