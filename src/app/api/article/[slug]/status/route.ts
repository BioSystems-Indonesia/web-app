import { ArticleRepositoryPrisma } from "@/infrastructure/article/ArticleRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { ArticleUseCase } from "@/usecases/article/ArticleUseCase";
import { ArticleStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const articleRepo = new ArticleRepositoryPrisma();
const articleUseCase = new ArticleUseCase(articleRepo);

export const PATCH = WithAuth(async (req: NextRequest, ctx: any) => {
  const body = await req.json();
  const { status } = body;

  try {
    const params = ctx?.params ? await ctx.params : undefined;
    const slug = params?.slug as string;

    if (!slug) {
      return NextResponse.json(APIResponseBuilder.badRequest("Invalid article slug"), {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    if (!status) {
      return NextResponse.json(APIResponseBuilder.badRequest("Status is required"), {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const result = await articleUseCase.updateStatus(slug, status as ArticleStatus);
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});
