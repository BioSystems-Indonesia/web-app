import { UserUpdateRequest } from "@/domain/dto/User";
import { UserRepositoryPrisma } from "@/infrastructure/user/UserRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { PasswordHasher } from "@/lib/helper/hash";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { UserUseCase } from "@/usecases/user/UserUseCase";
import { NextResponse } from "next/server";

const userRepo = new UserRepositoryPrisma();
const hasher = new PasswordHasher();
const userUseCase = new UserUseCase(userRepo, hasher);

export const GET = WithAuth(async (_req, ctx) => {
  try {
    const params = ctx?.params ? await ctx.params : undefined;
    const userId = params?.id;
    if (!userId) {
      return NextResponse.json(APIResponseBuilder.badRequest("Invalid user id"), {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const result = await userUseCase.getByid(userId);
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});

export const PUT = WithAuth(async (req, ctx) => {
  const { name, email, role } = await req.json();
  try {
    const payload: UserUpdateRequest = {
      email,
      name,
      role,
    };

    const params = ctx?.params ? await ctx.params : undefined;
    const userId = params?.id;
    if (!userId) {
      return NextResponse.json(APIResponseBuilder.badRequest("Invalid user id"), {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const result = await userUseCase.update(userId, payload);
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});

export const DELETE = WithAuth(async (_req, ctx) => {
  try {
    const params = ctx?.params ? await ctx.params : undefined;
    const userId = params?.id;
    if (!userId) {
      return NextResponse.json(APIResponseBuilder.badRequest("Invalid user id"), {
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const result = await userUseCase.delete(userId);
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});
