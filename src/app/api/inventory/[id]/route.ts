import { InventoryRequest } from "@/domain/dto/Inventory";
import { InventoryRepositoryPrisma } from "@/infrastructure/inventory/InventoryRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { InventoryUseCase } from "@/usecases/inventory/InventoryUseCase";
import { NextRequest, NextResponse } from "next/server";

const inventoryRepo = new InventoryRepositoryPrisma();
const inventoryUseCase = new InventoryUseCase(inventoryRepo);

export const GET = WithAuth(
  async (
    _req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = params?.id as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid inventory id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const result = await inventoryUseCase.getById(id);
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
    const body = (await req.json()) as InventoryRequest;
    const { assetCode, assetType, categoryId, status } = body;

    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = params?.id as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid inventory id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const payload: InventoryRequest = {
        assetCode: assetCode,
        assetType: assetType,
        categoryId: categoryId,
        status: status,
      };

      const result = await inventoryUseCase.update(id, payload);
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
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid inventory id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const result = await inventoryUseCase.deleteById(id);
      const response = NextResponse.json(APIResponseBuilder.success(result), {
        status: HttpStatus.OK,
      });

      return response;
    } catch (error) {
      return HttpErrorHandler.handle(error);
    }
  }
);
