import { KPIAuditRequest } from "@/domain/dto/KPIAudit";
import { KPIRepositoryPrisma } from "@/infrastructure/kpi/KPIRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { KPIUseCase } from "@/usecases/kpi/KPIUseCase";
import { NextResponse } from "next/server";

const repo = new KPIRepositoryPrisma();
const useCase = new KPIUseCase(repo);

export const POST = WithAuth(async (req) => {
  const body = (await req.json()) as KPIAuditRequest;
  const { auditorId, kpiId, notes, score } = body;

  try {
    const payload: KPIAuditRequest = {
      auditorId: auditorId,
      kpiId: kpiId,
      notes: notes ?? null,
      score: score ?? null,
    };

    const result = await useCase.addAudit(payload);
    const response = NextResponse.json(APIResponseBuilder.created(result), {
      status: HttpStatus.CREATED,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});
