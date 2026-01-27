import { KPIRequest } from "@/domain/dto/KPI";
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
  const body = (await req.json()) as KPIRequest;
  const { employeeId, period, documentFile, description } = body;

  try {
    const payload: KPIRequest = {
      employeeId: employeeId,
      period: period,
      documentFile: documentFile,
      description: description ?? null,
    };

    const result = await useCase.create(payload);
    const response = NextResponse.json(APIResponseBuilder.created(result), {
      status: HttpStatus.CREATED,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});

export const GET = async () => {
  try {
    const result = await useCase.getAll();
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
};
