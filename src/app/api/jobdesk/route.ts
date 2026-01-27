import { JobdeskRequest } from "@/domain/dto/Jobdesk";
import { JobdeskRepositoryPrisma } from "@/infrastructure/jobdesk/JobdeskRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { JobdeskUseCase } from "@/usecases/jobdesk/JobdeskUseCase";
import { NextResponse } from "next/server";

const repo = new JobdeskRepositoryPrisma();
const useCase = new JobdeskUseCase(repo);

export const POST = WithAuth(async (req) => {
  const body = (await req.json()) as JobdeskRequest;
  const { title, description, positionId } = body;

  try {
    const payload: JobdeskRequest = {
      title: title,
      description: description ?? null,
      positionId: positionId,
    };

    const result = await useCase.create(payload);
    const response = NextResponse.json(APIResponseBuilder.created(result), {
      status: HttpStatus.CREATED,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});

export const GET = async () => {
  try {
    const result = await useCase.getAll();
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
};
