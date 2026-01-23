import { AttendanceRepositoryPrisma } from "@/infrastructure/attendance/AttendanceRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { WithAuth } from "@/lib/http/WithAuth";
import { AttendanceUseCase } from "@/usecases/attendance/AttendanceUseCase";
import { NextRequest, NextResponse } from "next/server";

const attendanceRepo = new AttendanceRepositoryPrisma();
const attendanceUseCase = new AttendanceUseCase(attendanceRepo);

export const GET = WithAuth(
  async (
    _req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const employeeId = params?.employeeId as string;

      if (!employeeId) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid employee id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const url = new URL(_req.url);
      const monthParam = url.searchParams.get("month");
      const yearParam = url.searchParams.get("year");

      if (monthParam !== null || yearParam !== null) {
        if (!monthParam || !yearParam) {
          return NextResponse.json(
            APIResponseBuilder.badRequest("Both month and year are required"),
            {
              status: HttpStatus.BAD_REQUEST,
            }
          );
        }

        const month = Number(monthParam);
        const year = Number(yearParam);

        if (!Number.isInteger(month) || month < 1 || month > 12) {
          return NextResponse.json(APIResponseBuilder.badRequest("Invalid month"), {
            status: HttpStatus.BAD_REQUEST,
          });
        }

        if (!Number.isInteger(year) || year < 1970 || year > 9999) {
          return NextResponse.json(APIResponseBuilder.badRequest("Invalid year"), {
            status: HttpStatus.BAD_REQUEST,
          });
        }

        const result = await attendanceUseCase.getByEmployeeIdAndMonth(employeeId, month, year);
        const response = NextResponse.json(APIResponseBuilder.success(result), {
          status: HttpStatus.OK,
        });

        return response;
      }

      const result = await attendanceUseCase.getAllByEmloyeeId(employeeId);
      const response = NextResponse.json(APIResponseBuilder.success(result), {
        status: HttpStatus.OK,
      });

      return response;
    } catch (error) {
      return NextResponse.json(APIResponseBuilder.badRequest(String(error)), {
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
);
