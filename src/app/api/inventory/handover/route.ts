import { InventoryHandoverRequest } from "@/domain/dto/InventoryHandover";
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
  const body = (await req.json()) as InventoryHandoverRequest;
  const { employeeId, inventoryId, handoverDate, conditionNotes, signatureFile } = body;

  try {
    const payload: InventoryHandoverRequest = {
      employeeId: employeeId,
      inventoryId: inventoryId,
      handoverDate: new Date(handoverDate),
      conditionNotes: conditionNotes,
      signatureFile: signatureFile,
    };

    const result = await inventoryUseCase.createHandover(payload);
    const response = NextResponse.json(APIResponseBuilder.created(result), {
      status: HttpStatus.CREATED,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});

export const GET = WithAuth(async () => {
  try {
    const result = await inventoryUseCase.getAll();
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});
