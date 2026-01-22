export interface CandidateExperienceRequest {
  candidateId: string;
  companyName: string;
  jobTitle: string;
  startDate: Date;
  endDate?: Date | null;
  description?: string | null;
  isStillWorking: boolean;
}
