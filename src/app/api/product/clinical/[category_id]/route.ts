import { ProductRepositoryPrisma } from "@/infrastructure/product/ProductRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { ProductUseCase } from "@/usecases/product/ProductUseCase";
import { ProductType } from "@prisma/client";
import { NextResponse } from "next/server";

const productCategoryRepo = new ProductRepositoryPrisma();
const productCategoryUseCase = new ProductUseCase(productCategoryRepo);

export const GET = WithAuth(async (_req, ctx) => {
  try {
    const categoryId = Number(ctx?.params?.category_id);

    if (!categoryId || isNaN(categoryId)) {
      return NextResponse.json(APIResponseBuilder.badRequest("Invalid category id"), {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const result = await productCategoryUseCase.getByCategoryAndType(
      ProductType.CLINICAL,
      categoryId
    );
    return NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});
