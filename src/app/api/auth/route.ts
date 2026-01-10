import { UpdatePasswordRequest } from "@/domain/dto/User";
import { AuthenticationRepositoryPrisma } from "@/infrastructure/authentication/AuthenticationRepository";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { PasswordHasher } from "@/lib/helper/hash";
import { JwtService } from "@/lib/helper/JwtService";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { WithAuth } from "@/lib/http/WithAuth";
import { AuthenticationUseCase } from "@/usecases/authentication/AuthenticationUseCase";
import { NextResponse } from "next/server";

const repo = new AuthenticationRepositoryPrisma();
const hasher = new PasswordHasher();
const jwt = new JwtService(process.env.SECRET_KEY!);

const authUseCase = new AuthenticationUseCase(repo, hasher, jwt);

export const PUT = WithAuth(async (req) => {
  const { username, currentPassword, newPassword, verifyPassword } = await req.json();

  try {
    const payload: UpdatePasswordRequest = {
      username,
      currentPassword,
      newPassword,
      verifyPassword,
    };

    const result = await authUseCase.updatePassword(payload);
    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
});
