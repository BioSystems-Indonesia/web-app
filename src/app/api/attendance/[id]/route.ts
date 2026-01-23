import { AttendanceRequest } from "@/domain/dto/Attendance";
import { AttendanceRepositoryPrisma } from "@/infrastructure/attendance/AttendanceRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { AttendanceUseCase } from "@/usecases/attendance/AttendanceUseCase";
import { AttendanceStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const attendanceRepo = new AttendanceRepositoryPrisma();
const attendanceUseCase = new AttendanceUseCase(attendanceRepo);

export const PUT = WithAuth(
  async (
    req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    const body = (await req.json()) as {
      employeeId: string;
      date: Date;
      checkIn?: Date | null;
      checkOut?: Date | null;
      status: AttendanceStatus;
    };

    const { employeeId, date, checkIn, checkOut, status } = body;

    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = params?.id as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid position id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const payload: AttendanceRequest = {
        employeeId,
        date,
        checkIn: checkIn ?? null,
        checkOut: checkOut ?? null,
        status,
      };

      const result = await attendanceUseCase.update(id, payload);
      const response = NextResponse.json(APIResponseBuilder.created(result), {
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
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid attendance id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      await attendanceUseCase.deleteById(id);

      const response = NextResponse.json(null, {
        status: HttpStatus.NO_CONTENT,
      });

      return response;
    } catch (error) {
      return NextResponse.json(APIResponseBuilder.badRequest(String(error)), {
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
);
