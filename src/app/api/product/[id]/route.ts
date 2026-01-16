import { ProductRequest } from "@/domain/dto/Product";
import { ProductRepositoryPrisma } from "@/infrastructure/product/ProductRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { ProductUseCase } from "@/usecases/product/ProductUseCase";
import { NextRequest, NextResponse } from "next/server";

const productRepo = new ProductRepositoryPrisma();
const productUseCase = new ProductUseCase(productRepo);

export const GET = WithAuth(
  async (
    _req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = Number(params?.id);

      if (!id || isNaN(id)) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid product id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const result = await productUseCase.getById(id);
      const response = NextResponse.json(APIResponseBuilder.success(result), {
        status: HttpStatus.OK,
      });

      return response;
    } catch (error) {
      return HttpErrorHandler.handle(error);
    }
  }
);

export const PUT = WithAuth(
  async (
    req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    const body = (await req.json()) as ProductRequest;
    const { name, method, productType, category, variant } = body;

    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = Number(params?.id);

      if (!id || isNaN(id)) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid product id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const payload: ProductRequest = {
        name: name,
        method: method,
        productType: productType,
        category: category,
        variant: variant,
      };

      const result = await productUseCase.update(id, payload);
      const response = NextResponse.json(APIResponseBuilder.success(result), {
        status: HttpStatus.OK,
      });

      return response;
    } catch (error) {
      return HttpErrorHandler.handle(error);
    }
  }
);

export const DELETE = WithAuth(
  async (
    _req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = Number(params?.id);

      if (!id || isNaN(id)) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid product id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const result = await productUseCase.delete(id);
      const response = NextResponse.json(APIResponseBuilder.success(result), {
        status: HttpStatus.OK,
      });

      return response;
    } catch (error) {
      return HttpErrorHandler.handle(error);
    }
  }
);
