import {
  RecruitmentCandidate,
  CandidateExperience,
  CandidateEducation,
  RecruitmentStatusHistory,
} from "@prisma/client";
import { RecruitmentCandidateRequest } from "../dto/RecruitmentCandidate";
import { CandidateExperienceRequest } from "../dto/CandidateExperience";
import { CandidateEducationRequest } from "../dto/CandidateEducation";
import { RecruitmentStatusHistoryRequest } from "../dto/RecruitmentStatusHistory";

export interface RecruitmentRepository {
  createCandidate(req: RecruitmentCandidateRequest): Promise<RecruitmentCandidate>;
  getCandidateById(id: string): Promise<RecruitmentCandidate>;
  getAllCandidates(): Promise<RecruitmentCandidate[]>;
  updateCandidate(id: string, req: RecruitmentCandidateRequest): Promise<RecruitmentCandidate>;
  deleteCandidate(id: string): Promise<void>;

  addExperience(req: CandidateExperienceRequest): Promise<CandidateExperience>;
  addEducation(req: CandidateEducationRequest): Promise<CandidateEducation>;
  addStatusHistory(req: RecruitmentStatusHistoryRequest): Promise<RecruitmentStatusHistory>;

  getExperiencesByCandidate(candidateId: string): Promise<CandidateExperience[]>;
  getEducationsByCandidate(candidateId: string): Promise<CandidateEducation[]>;
  getStatusHistoryByCandidate(candidateId: string): Promise<RecruitmentStatusHistory[]>;
}
