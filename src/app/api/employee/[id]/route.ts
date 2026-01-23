import { EmployeeRequest } from "@/domain/dto/Employee";
import { EmployeeRepositoryPrisma } from "@/infrastructure/employee/EmployeeRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { WithAuth } from "@/lib/http/WithAuth";
import { EmployeeUseCase } from "@/usecases/employee/EmployeeUseCase";
import { NextRequest, NextResponse } from "next/server";

const employeeRepo = new EmployeeRepositoryPrisma();
const employeeUseCase = new EmployeeUseCase(employeeRepo);

export const GET = WithAuth(
  async (
    _req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = params?.id as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid employee id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const result = await employeeUseCase.getById(id);
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

export const PUT = WithAuth(
  async (
    req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    const body = (await req.json()) as EmployeeRequest;
    const {
      employeeCode,
      fullName,
      positionId,
      joinDate,
      employeeStatus,
      birthDate,
      nationalId,
      salary,
      domicile,
      email,
      motherName,
      religion,
      bankName,
      bankAccount,
      bpjsNumber,
      taxNumber,
    } = body;

    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = params?.id as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid employee id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const payload: EmployeeRequest = {
        employeeCode,
        fullName,
        positionId,
        joinDate,
        employeeStatus,
        birthDate,
        nationalId,
        salary,
        domicile,
        email,
        motherName,
        religion,
        bankName,
        bankAccount,
        bpjsNumber,
        taxNumber,
      };

      const result = await employeeUseCase.update(id, payload);
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

export const DELETE = WithAuth(
  async (
    _req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = params?.id as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid employee id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      await employeeUseCase.deleteById(id);

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
