import { WithAuth } from "@/lib/http/WithAuth";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { NextRequest, NextResponse } from "next/server";
import { LeaveRepositoryPrisma } from "@/infrastructure/leave/LeaveRepository";
import { LeaveUseCase } from "@/usecases/leave/LeaveUseCase";

const leaveRepo = new LeaveRepositoryPrisma();
const leaveUseCase = new LeaveUseCase(leaveRepo);

export const GET = WithAuth(
  async (
    req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = params?.id as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid leave id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const result = await leaveUseCase.getById(id);
      const response = NextResponse.json(APIResponseBuilder.success(result), {
        status: HttpStatus.OK,
      });

      return response;
    } catch (error) {
      return HttpErrorHandler.handle(error);
    }
  }
);

export const PUT = WithAuth(
  async (
    req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    const body = (await req.json()) as Partial<{
      employeeId: string;
      position: string;
      leaveType: string;
      startDate: string | Date;
      endDate: string | Date;
      totalDays: number;
      status?: string;
      approvedBy?: string | null;
    }>;

    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = params?.id as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid leave id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const payload = {
        ...body,
      };

      const result = await leaveUseCase.update(id, payload as any);
      const response = NextResponse.json(APIResponseBuilder.success(result), {
        status: HttpStatus.OK,
      });

      return response;
    } catch (error) {
      return HttpErrorHandler.handle(error);
    }
  }
);

export const DELETE = WithAuth(
  async (
    _req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = params?.id as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid leave id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      await leaveUseCase.deleteById(id);

      const response = NextResponse.json(null, {
        status: HttpStatus.NO_CONTENT,
      });

      return response;
    } catch (error) {
      return HttpErrorHandler.handle(error);
    }
  }
);
