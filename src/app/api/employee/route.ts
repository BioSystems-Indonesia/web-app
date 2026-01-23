import { EmployeeRequest } from "@/domain/dto/Employee";
import { EmployeeRepositoryPrisma } from "@/infrastructure/employee/EmployeeRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { EmployeeUseCase } from "@/usecases/employee/EmployeeUseCase";
import { NextResponse } from "next/server";

const employeeRepo = new EmployeeRepositoryPrisma();
const employeeUseCase = new EmployeeUseCase(employeeRepo);

export const POST = WithAuth(async (req) => {
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

    const result = await employeeUseCase.create(payload);
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
    const result = await employeeUseCase.getAll();
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});
