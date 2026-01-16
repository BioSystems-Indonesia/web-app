import { ArticleRepositoryPrisma } from "@/infrastructure/article/ArticleRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { ArticleUseCase } from "@/usecases/article/ArticleUseCase";
import { NextRequest, NextResponse } from "next/server";

const articleRepo = new ArticleRepositoryPrisma();
const articleUseCase = new ArticleUseCase(articleRepo);

export const GET = async (_req: NextRequest, ctx: any) => {
  try {
    const params = ctx?.params ? await ctx.params : undefined;
    const slug = params?.slug as string;

    if (!slug) {
      return NextResponse.json(APIResponseBuilder.badRequest("Invalid article slug"), {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const result = await articleUseCase.getBySlug(slug);
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
};
