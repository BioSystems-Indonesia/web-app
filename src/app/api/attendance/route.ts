import { WithAuth } from "@/lib/http/WithAuth";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { NextResponse } from "next/server";
import { AttendanceRepositoryPrisma } from "@/infrastructure/attendance/AttendanceRepository";
import { AttendanceUseCase } from "@/usecases/attendance/AttendanceUseCase";
import { AttendanceRequest } from "@/domain/dto/Attendance";
import { AttendanceStatus } from "@prisma/client";

const attendanceRepo = new AttendanceRepositoryPrisma();
const attendanceUseCase = new AttendanceUseCase(attendanceRepo);

export const POST = WithAuth(async (req) => {
  const body = (await req.json()) as {
    employeeId: string;
    date: Date;
    checkIn?: Date | null;
    checkOut?: Date | null;
    status: AttendanceStatus;
  };

  const { employeeId, date, checkIn, checkOut, status } = body;

  try {
    const payload: AttendanceRequest = {
      employeeId,
      date,
      checkIn: checkIn ?? null,
      checkOut: checkOut ?? null,
      status,
    };

    const result = await attendanceUseCase.create(payload);
    const response = NextResponse.json(APIResponseBuilder.created(result), {
      status: HttpStatus.CREATED,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});
