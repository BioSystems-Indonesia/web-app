import { PositionRequest } from "@/domain/dto/Position";
import { PositionRepositoryPrisma } from "@/infrastructure/position/PositionRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { WithAuth } from "@/lib/http/WithAuth";
import { PositionUseCase } from "@/usecases/position/PositionUseCase";
import { NextRequest, NextResponse } from "next/server";

const positionRepo = new PositionRepositoryPrisma();
const positionUseCase = new PositionUseCase(positionRepo);

export const GET = WithAuth(
  async (
    _req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = params?.id as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid position id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const result = await positionUseCase.getById(id);
      const response = NextResponse.json(APIResponseBuilder.success(result), {
        status: HttpStatus.OK,
      });

      return response;
    } catch (error) {
      return NextResponse.json(APIResponseBuilder.badRequest(String(error)), {
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
);

export const PUT = WithAuth(
  async (
    req: NextRequest,
    ctx?: { params?: Promise<Record<string, string>> | Record<string, string> }
  ) => {
    const body = (await req.json()) as PositionRequest;
    const { code, name, description } = body;

    try {
      const params = ctx?.params ? await ctx.params : undefined;
      const id = params?.id as string;

      if (!id) {
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid position id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const payload = {
        code,
        name,
        description,
      };

      const result = await positionUseCase.update(id, payload);
      const response = NextResponse.json(APIResponseBuilder.success(result), {
        status: HttpStatus.OK,
      });

      return response;
    } catch (error) {
      return NextResponse.json(APIResponseBuilder.badRequest(String(error)), {
        status: HttpStatus.BAD_REQUEST,
      });
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
        return NextResponse.json(APIResponseBuilder.badRequest("Invalid position id"), {
          status: HttpStatus.BAD_REQUEST,
        });
      }

      await positionUseCase.deleteById(id);

      const response = NextResponse.json(null, {
        status: HttpStatus.NO_CONTENT,
      });

      return response;
    } catch (error) {
      return NextResponse.json(APIResponseBuilder.badRequest(String(error)), {
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
);
