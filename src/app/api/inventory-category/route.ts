import { InventoryCategoryRequest } from "@/domain/dto/InventoryCategory";
import { InventoryCategoryRepositoryPrisma } from "@/infrastructure/inventory/InventoryCategoryRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { InventoryCategoryUseCase } from "@/usecases/inventory/InventoryCategoryUseCase";
import { NextResponse } from "next/server";

const categoryRepo = new InventoryCategoryRepositoryPrisma();
const categoryUseCase = new InventoryCategoryUseCase(categoryRepo);

export const POST = WithAuth(async (req) => {
  const body = (await req.json()) as InventoryCategoryRequest;
  const { code, name } = body;

  try {
    const payload: InventoryCategoryRequest = {
      code: code,
      name: name,
    };

    const result = await categoryUseCase.create(payload);
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
    const result = await categoryUseCase.getAll();
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
};
