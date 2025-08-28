import { AuthenticationRepositoryPrisma } from "@/infrastructure/authentication/AuthenticationRepository";
import { APIResponseBuilder } from "@/lib/helper/apiResponse";
import { PasswordHasher } from "@/lib/helper/hash";
import { JwtService } from "@/lib/helper/JwtService";
import { AuthenticationUseCase } from "@/usecases/authentication/AuthenticationUseCase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const repo = new AuthenticationRepositoryPrisma();
  const hasher = new PasswordHasher();
  const jwt = new JwtService(process.env.SECRET_KEY || "");
  const authUseCase = new AuthenticationUseCase(repo, hasher, jwt);

  try {
    const result = await authUseCase.login(username, password);
    const response = NextResponse.json(APIResponseBuilder.success(result));

    response.cookies.set({
      name: "token",
      value: result.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error: unknown) {
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message: string }).message
        : String(error);
    if (errorMessage.includes("wrong")) {
      APIResponseBuilder.unauthorized(error);
    }
    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
