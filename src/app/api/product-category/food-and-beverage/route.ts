import { ProductCategoryRepositoryPrisma } from "@/infrastructure/productCategory/ProductCategoryRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { ProductCategoryUseCase } from "@/usecases/productCategory/ProductCategoryUseCase";
import { ProductType } from "@prisma/client";
import { NextResponse } from "next/server";

const productCategoryRepo = new ProductCategoryRepositoryPrisma();
const productCategoryUseCase = new ProductCategoryUseCase(productCategoryRepo);

export const GET = WithAuth(async () => {
  try {
    const result = await productCategoryUseCase.getByProductType(ProductType.FOOD_AND_BEVERAGE);
    const response = NextResponse.json(APIResponseBuilder.success(result));

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});
