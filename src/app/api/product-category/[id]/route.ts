import { NextResponse } from "next/server";
import { HttpStatus } from "@/lib/constant/responseCode";
import { WithAuth } from "@/lib/http/WithAuth";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { ProductCategoryRepositoryPrisma } from "@/infrastructure/productCategory/ProductCategoryRepository";
import { ProductCategoryUseCase } from "@/usecases/productCategory/ProductCategoryUseCase";
import { ProductCategoryRequest } from "@/domain/dto/ProductCategory";

const productCategoryRepo = new ProductCategoryRepositoryPrisma();
const productCategoryUseCase = new ProductCategoryUseCase(productCategoryRepo);

export const GET = WithAuth(async (_req, ctx) => {
  try {
    const id = Number(ctx?.params?.id);

    if (!id || isNaN(id)) {
      return NextResponse.json(APIResponseBuilder.badRequest("Invalid category id"), {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const category = await productCategoryUseCase.getById(id);

    return NextResponse.json(APIResponseBuilder.success(category), { status: HttpStatus.OK });
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});

export const PUT = WithAuth(async (req, ctx) => {
  try {
    const id = Number(ctx?.params?.id);

    if (!id || isNaN(id)) {
      return NextResponse.json(APIResponseBuilder.badRequest("Invalid category id"), {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const { name, icon } = await req.json();

    const payload: ProductCategoryRequest = {
      category: name,
      icon,
    };

    const result = await productCategoryUseCase.update(payload, id);

    return NextResponse.json(APIResponseBuilder.success(result), { status: HttpStatus.OK });
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});

export const DELETE = WithAuth(async (_req, ctx) => {
  try {
    const id = Number(ctx?.params?.id);

    if (!id || isNaN(id)) {
      return NextResponse.json(APIResponseBuilder.badRequest("Invalid category id"), {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const result = await productCategoryUseCase.delete(id);

    return NextResponse.json(APIResponseBuilder.success(result), { status: HttpStatus.OK });
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});
