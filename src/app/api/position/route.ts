import { PositionRepositoryPrisma } from "@/infrastructure/position/PositionRepository";
import { WithAuth } from "@/lib/http/WithAuth";
import { PositionUseCase } from "@/usecases/position/PositionUseCase";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { NextResponse } from "next/server";
import { PositionRequest } from "@/domain/dto/Position";

const positionRepo = new PositionRepositoryPrisma();
const positionUseCase = new PositionUseCase(positionRepo);

export const POST = WithAuth(async (req) => {
  const body = (await req.json()) as {
    code: string;
    name: string;
    description?: string | null;
  };

  const { code, name, description } = body;

  try {
    const payload: PositionRequest = {
      code,
      name,
      description,
    };

    const result = await positionUseCase.create(payload);
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
    const result = await positionUseCase.getAll();
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});
