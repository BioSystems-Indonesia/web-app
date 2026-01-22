export interface CandidateEducationRequest {
  candidateId: string;
  highestDegree: string; // maps to Degree enum in Prisma
  institutionName: string;
  fieldOfStudy: string;
  endYear?: number | null;
  gpa?: number | null;
}
