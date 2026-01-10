import { UserRequest } from "@/domain/dto/User";
import { UserRepositoryPrisma } from "@/infrastructure/user/UserRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { PasswordHasher } from "@/lib/helper/hash";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { UserUseCase } from "@/usecases/user/UserUseCase";
import { NextRequest, NextResponse } from "next/server";

const userRepo = new UserRepositoryPrisma();
const hasher = new PasswordHasher();
const userUseCase = new UserUseCase(userRepo, hasher);

export const POST = async (req: NextRequest) => {
  const { name, email, role, username, password, verifyPassword } = await req.json();
  try {
    const payload: UserRequest = {
      email,
      name,
      password,
      role,
      username,
      verifyPassword,
    };

    const result = await userUseCase.register(payload);
    const response = NextResponse.json(APIResponseBuilder.created(result), {
      status: HttpStatus.CREATED,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
};

export const GET = WithAuth(async () => {
  try {
    const result = await userUseCase.getAll();
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});
