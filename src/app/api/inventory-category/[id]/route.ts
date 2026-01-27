import { InventoryCategoryRequest } from "@/domain/dto/InventoryCategory";
import { InventoryCategoryRepositoryPrisma } from "@/infrastructure/inventory/InventoryCategoryRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { InventoryCategoryUseCase } from "@/usecases/inventory/InventoryCategoryUseCase";
import { NextRequest, NextResponse } from "next/server";

const categoryRepo = new InventoryCategoryRepositoryPrisma();
const categoryUseCase = new InventoryCategoryUseCase(categoryRepo);

export const GET = WithAuth(
  async (
    _req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = params?.id as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid inventory category id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const result = await categoryUseCase.getById(id);
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
    const body = (await req.json()) as InventoryCategoryRequest;
    const { code, name } = body;

    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = params?.id as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid inventory category id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const payload: InventoryCategoryRequest = {
        code: code,
        name: name,
      };

      const result = await categoryUseCase.update(id, payload);
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
      const id = params?.id as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid inventory category id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const result = await categoryUseCase.deleteById(id);
      const response = NextResponse.json(APIResponseBuilder.success(result), {
        status: HttpStatus.OK,
      });

      return response;
    } catch (error) {
      return HttpErrorHandler.handle(error);
    }
  }
);
