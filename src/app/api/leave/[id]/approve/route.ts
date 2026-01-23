import { WithAuth } from "@/lib/http/WithAuth";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { NextRequest, NextResponse } from "next/server";
import { LeaveRepositoryPrisma } from "@/infrastructure/leave/LeaveRepository";
import { LeaveUseCase } from "@/usecases/leave/LeaveUseCase";

const leaveRepo = new LeaveRepositoryPrisma();
const leaveUseCase = new LeaveUseCase(leaveRepo);

export const POST = WithAuth(
  async (
    req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    const body = (await req.json()) as { approverId: string; approve: boolean };

    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = params?.id as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid leave id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const result = await leaveUseCase.approve(id, body.approverId, body.approve);
      const response = NextResponse.json(APIResponseBuilder.success(result), {
        status: HttpStatus.OK,
      });

      return response;
    } catch (error) {
      return HttpErrorHandler.handle(error);
    }
  }
);
