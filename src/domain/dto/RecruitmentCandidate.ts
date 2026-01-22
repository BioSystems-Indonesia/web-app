import { RecruitmentStatus } from "@prisma/client";

export interface RecruitmentCandidateRequest {
  fullName: string;
  email?: string | null;
  phone: string;
  birthDate: Date;
  address: string;
  domicile: string;
  urlCV: string;
  urlSelfPhoto: string;
  urlPortfolio?: string | null;
  coverLetter?: string | null;
  expectedSalery: number;
  availabilityToStart: Date;
  profesionalReference: string;
  source: string;
  status?: RecruitmentStatus;
}
