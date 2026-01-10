import { ArticleRequest } from "@/domain/dto/Article";
import { ArticleRepositoryPrisma } from "@/infrastructure/article/ArticleRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { ArticleUseCase } from "@/usecases/article/ArticleUseCase";
import { NextRequest, NextResponse } from "next/server";

const articleRepo = new ArticleRepositoryPrisma();
const articleUseCase = new ArticleUseCase(articleRepo);

export const POST = WithAuth(async (req: NextRequest) => {
  const body = (await req.json()) as ArticleRequest;
  const { title, subTitle, authorId, heroImage, contentHtml, excerpt, references, status } = body;

  try {
    const payload: ArticleRequest = {
      title,
      subTitle,
      authorId,
      heroImage,
      contentHtml,
      excerpt,
      references,
      status,
    };

    const result = await articleUseCase.create(payload);
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
    const result = await articleUseCase.getAll();
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
};
