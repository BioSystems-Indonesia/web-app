import { ProductRequest } from "@/domain/dto/Product";
import { ProductRepositoryPrisma } from "@/infrastructure/product/ProductRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { ProductUseCase } from "@/usecases/product/ProductUseCase";
import { NextResponse } from "next/server";

const productRepo = new ProductRepositoryPrisma();
const productUseCase = new ProductUseCase(productRepo);

export const POST = WithAuth(async (req) => {
  const body = (await req.json()) as ProductRequest;
  const { name, method, category, productType, variant } = body;

  try {
    const payload: ProductRequest = {
      name: name,
      method: method,
      productType: productType,
      category: category,
      variant: variant,
    };

    const result = await productUseCase.create(payload);
    const response = NextResponse.json(APIResponseBuilder.created(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});

export const GET = WithAuth(async () => {
  try {
    const result = await productUseCase.getAll();
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});
