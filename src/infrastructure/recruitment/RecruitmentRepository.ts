import {
  RecruitmentCandidate,
  CandidateExperience,
  CandidateEducation,
  RecruitmentStatusHistory,
} from "@prisma/client";
import { prisma } from "../prisma/PrismaClient";
import { RecruitmentCandidateRequest } from "@/domain/dto/RecruitmentCandidate";
import { CandidateExperienceRequest } from "@/domain/dto/CandidateExperience";
import { CandidateEducationRequest } from "@/domain/dto/CandidateEducation";
import { RecruitmentStatusHistoryRequest } from "@/domain/dto/RecruitmentStatusHistory";
import { NotFoundError } from "@/lib/http/error";

export class RecruitmentRepositoryPrisma {
  async createCandidate(req: RecruitmentCandidateRequest): Promise<RecruitmentCandidate> {
    const candidate = await prisma.recruitmentCandidate.create({
      data: {
        fullName: req.fullName,
        email: req.email ?? undefined,
        phone: req.phone,
        birthDate: req.birthDate,
        address: req.address,
        domicile: req.domicile,
        status: req.status ?? undefined,
        urlCV: req.urlCV,
        urlSelfPhoto: req.urlSelfPhoto,
        urlPortfolio: req.urlPortfolio ?? undefined,
        coverLetter: req.coverLetter ?? undefined,
        expectedSalery: req.expectedSalery,
        availabilityToStart: req.availabilityToStart,
        profesionalReference: req.profesionalReference,
        source: req.source,
      },
    });

    return candidate;
  }

  async getCandidateById(id: string): Promise<RecruitmentCandidate> {
    const candidate = await prisma.recruitmentCandidate.findFirst({
      where: { id, deletedAt: null },
    });
    if (!candidate) throw new NotFoundError(`RecruitmentCandidate ${id} not found`);
    return candidate;
  }

  async getAllCandidates(): Promise<RecruitmentCandidate[]> {
    return await prisma.recruitmentCandidate.findMany({
      where: { deletedAt: null },
      orderBy: { appliedAt: "desc" },
    });
  }

  async updateCandidate(
    id: string,
    req: RecruitmentCandidateRequest
  ): Promise<RecruitmentCandidate> {
    const exists = await prisma.recruitmentCandidate.findFirst({ where: { id, deletedAt: null } });
    if (!exists) throw new NotFoundError(`RecruitmentCandidate ${id} not found`);

    const updated = await prisma.recruitmentCandidate.update({
      where: { id },
      data: {
        fullName: req.fullName,
        email: req.email ?? undefined,
        phone: req.phone,
        birthDate: req.birthDate,
        address: req.address,
        domicile: req.domicile,
        status: req.status ?? undefined,
        urlCV: req.urlCV,
        urlSelfPhoto: req.urlSelfPhoto,
        urlPortfolio: req.urlPortfolio ?? undefined,
        coverLetter: req.coverLetter ?? undefined,
        expectedSalery: req.expectedSalery,
        availabilityToStart: req.availabilityToStart,
        profesionalReference: req.profesionalReference,
        source: req.source,
      },
    });

    return updated;
  }

  async deleteCandidate(id: string): Promise<void> {
    const exists = await prisma.recruitmentCandidate.findFirst({ where: { id, deletedAt: null } });
    if (!exists) throw new NotFoundError(`RecruitmentCandidate ${id} not found`);
    await prisma.recruitmentCandidate.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async addExperience(req: CandidateExperienceRequest): Promise<CandidateExperience> {
    const candidateExists = await prisma.recruitmentCandidate.count({
      where: { id: req.candidateId, deletedAt: null },
    });
    if (candidateExists === 0)
      throw new NotFoundError(`RecruitmentCandidate ${req.candidateId} not found`);

    const exp = await prisma.candidateExperience.create({
      data: {
        candidate: { connect: { id: req.candidateId } },
        companyName: req.companyName,
        jobTitle: req.jobTitle,
        startDate: req.startDate,
        endDate: req.endDate ?? undefined,
        description: req.description ?? undefined,
        isStillWorking: req.isStillWorking,
      },
    });

    return exp;
  }

  async addEducation(req: CandidateEducationRequest): Promise<CandidateEducation> {
    const candidateExists = await prisma.recruitmentCandidate.count({
      where: { id: req.candidateId, deletedAt: null },
    });
    if (candidateExists === 0)
      throw new NotFoundError(`RecruitmentCandidate ${req.candidateId} not found`);

    const edu = await prisma.candidateEducation.create({
      data: {
        candidate: { connect: { id: req.candidateId } },
        highestDegree: req.highestDegree as any,
        institutionName: req.institutionName,
        fieldOfStudy: req.fieldOfStudy,
        endYear: req.endYear ?? undefined,
        gpa: req.gpa ?? undefined,
      },
    });

    return edu;
  }

  async addStatusHistory(req: RecruitmentStatusHistoryRequest): Promise<RecruitmentStatusHistory> {
    const candidate = await prisma.recruitmentCandidate.findFirst({
      where: { id: req.candidateId, deletedAt: null },
    });
    if (!candidate) throw new NotFoundError(`RecruitmentCandidate ${req.candidateId} not found`);

    const hist = await prisma.recruitmentStatusHistory.create({
      data: {
        candidate: { connect: { id: req.candidateId } },
        status: req.status,
        notes: req.notes ?? undefined,
      },
    });

    await prisma.recruitmentCandidate.update({
      where: { id: req.candidateId },
      data: { status: req.status },
    });

    return hist;
  }

  async getExperiencesByCandidate(candidateId: string): Promise<CandidateExperience[]> {
    return await prisma.candidateExperience.findMany({
      where: { candidateId },
      orderBy: { startDate: "desc" },
    });
  }

  async getEducationsByCandidate(candidateId: string): Promise<CandidateEducation[]> {
    return await prisma.candidateEducation.findMany({
      where: { candidateId },
      orderBy: { endYear: "desc" },
    });
  }

  async getStatusHistoryByCandidate(candidateId: string): Promise<RecruitmentStatusHistory[]> {
    return await prisma.recruitmentStatusHistory.findMany({
      where: { candidateId },
      orderBy: { createdAt: "desc" },
    });
  }
}
