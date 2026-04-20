export interface OnboardingProfile {
  name: string;
  email: string;
  stage: string;
  targetRole: string;
  experience: string;
  struggle?: string;
}

export interface IntakePayload {
  profile: OnboardingProfile;
  cvText: string;
  jobDescription: string;
  company?: string;
  interviewDate?: string;
}
