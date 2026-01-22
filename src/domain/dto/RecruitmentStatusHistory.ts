import { RecruitmentStatus } from "@prisma/client";

export interface RecruitmentStatusHistoryRequest {
  candidateId: string;
  status: RecruitmentStatus;
  notes?: string | null;
}
