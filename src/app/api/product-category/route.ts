import { ProductCategoryRequest } from "@/domain/dto/ProductCategory";
import { ProductCategoryRepositoryPrisma } from "@/infrastructure/productCategory/ProductCategoryRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { ProductCategoryUseCase } from "@/usecases/productCategory/ProductCategoryUseCase";
import { NextResponse } from "next/server";

const productCategoryRepo = new ProductCategoryRepositoryPrisma();
const productCategoryUseCase = new ProductCategoryUseCase(productCategoryRepo);

export const POST = WithAuth(async (req) => {
  const { name, productType, icon } = await req.json();

  try {
    const payload: ProductCategoryRequest = {
      category: name,
      categorType: productType,
      icon: icon,
    };
    const result = await productCategoryUseCase.create(payload);
    const response = NextResponse.json(APIResponseBuilder.created(result));

    return response;
  } catch (error: unknown) {
    return HttpErrorHandler.handle(error);
  }
});

export const GET = async () => {
  try {
    const result = await productCategoryUseCase.getAll();
    const response = NextResponse.json(APIResponseBuilder.success(result));

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
};
