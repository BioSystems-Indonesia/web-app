import { JobdeskRepositoryPrisma } from "@/infrastructure/jobdesk/JobdeskRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { JobdeskUseCase } from "@/usecases/jobdesk/JobdeskUseCase";
import { NextRequest, NextResponse } from "next/server";

const repo = new JobdeskRepositoryPrisma();
const useCase = new JobdeskUseCase(repo);

export const GET = WithAuth(
  async (
    _req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = params?.employeeId as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid employee id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const result = await useCase.getJobdesksByEmployee(id);
      const response = NextResponse.json(APIResponseBuilder.success(result), {
        status: HttpStatus.OK,
      });

      return response;
    } catch (error) {
      return HttpErrorHandler.handle(error);
    }
  }
);
