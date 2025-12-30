import { AuthenticationRepositoryPrisma } from "@/infrastructure/authentication/AuthenticationRepository";
import { PasswordHasher } from "@/lib/helper/hash";
import { JwtService } from "@/lib/helper/JwtService";
import { AuthenticationUseCase } from "@/usecases/authentication/AuthenticationUseCase";

import { NextRequest, NextResponse } from "next/server";
import { HttpStatus } from "@/lib/constant/responseCode";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const repo = new AuthenticationRepositoryPrisma();
    const hasher = new PasswordHasher();
    const jwt = new JwtService(process.env.SECRET_KEY!);

    const authUseCase = new AuthenticationUseCase(repo, hasher, jwt);

    const result = await authUseCase.login(username, password);

    const response = NextResponse.json(APIResponseBuilder.success(result), {
      status: HttpStatus.OK,
    });

    response.cookies.set({
      name: "token",
      value: result.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
}
