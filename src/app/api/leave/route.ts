import { WithAuth } from "@/lib/http/WithAuth";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { NextResponse } from "next/server";
import { LeaveRepositoryPrisma } from "@/infrastructure/leave/LeaveRepository";
import { LeaveUseCase } from "@/usecases/leave/LeaveUseCase";

const leaveRepo = new LeaveRepositoryPrisma();
const leaveUseCase = new LeaveUseCase(leaveRepo);

export const POST = WithAuth(async (req) => {
  const body = (await req.json()) as {
    employeeId: string;
    position: string;
    leaveType: string;
    startDate: string | Date;
    endDate: string | Date;
    totalDays: number;
    status?: string;
    approvedBy?: string | null;
  };

  try {
    const payload = {
      employeeId: body.employeeId,
      position: body.position,
      leaveType: body.leaveType,
      startDate: body.startDate,
      endDate: body.endDate,
      totalDays: body.totalDays,
      status: body.status,
      approvedBy: body.approvedBy ?? null,
    };

    const result = await leaveUseCase.create(payload as any);
    const response = NextResponse.json(APIResponseBuilder.created(result), {
      status: HttpStatus.CREATED,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});

export const GET = WithAuth(async () => {
  try {
    const result = await leaveUseCase.getAll();
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});
