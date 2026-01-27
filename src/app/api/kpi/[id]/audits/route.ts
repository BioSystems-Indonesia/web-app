import { KPIRepositoryPrisma } from "@/infrastructure/kpi/KPIRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { KPIUseCase } from "@/usecases/kpi/KPIUseCase";
import { NextRequest, NextResponse } from "next/server";

const repo = new KPIRepositoryPrisma();
const useCase = new KPIUseCase(repo);

export const GET = WithAuth(
  async (
    _req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = params?.id as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid kpi id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const result = await useCase.getAuditsByKpi(id);
      const response = NextResponse.json(APIResponseBuilder.success(result), {
        status: HttpStatus.OK,
      });

      return response;
    } catch (error) {
      return HttpErrorHandler.handle(error);
    }
  }
);
