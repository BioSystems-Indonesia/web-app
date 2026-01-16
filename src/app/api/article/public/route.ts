import { ArticleRepositoryPrisma } from "@/infrastructure/article/ArticleRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { ArticleUseCase } from "@/usecases/article/ArticleUseCase";
import { NextResponse } from "next/server";

const articleRepo = new ArticleRepositoryPrisma();
const articleUseCase = new ArticleUseCase(articleRepo);

export const GET = async () => {
  try {
    const result = await articleUseCase.getAllPublished();
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
};
