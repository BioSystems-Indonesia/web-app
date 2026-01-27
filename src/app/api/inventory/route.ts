import { InventoryRequest } from "@/domain/dto/Inventory";
import { InventoryRepositoryPrisma } from "@/infrastructure/inventory/InventoryRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { InventoryUseCase } from "@/usecases/inventory/InventoryUseCase";
import { NextResponse } from "next/server";

const inventoryRepo = new InventoryRepositoryPrisma();
const inventoryUseCase = new InventoryUseCase(inventoryRepo);

export const POST = WithAuth(async (req) => {
  const body = (await req.json()) as InventoryRequest;
  const { assetCode, assetType, categoryId, status } = body;

  try {
    const payload: InventoryRequest = {
      assetCode: assetCode,
      assetType: assetType,
      categoryId: categoryId,
      status: status,
    };

    const result = await inventoryUseCase.create(payload);
    const response = NextResponse.json(APIResponseBuilder.created(result), {
      status: HttpStatus.CREATED,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});

export const GET = async () => {
  try {
    const result = await inventoryUseCase.getAll();
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
};
