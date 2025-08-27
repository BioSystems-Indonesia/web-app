import { AuthenticationRepositoryPrisma } from "@/infrastructure/prisma/AuthenticationRepositoryPrisma";
import { APIResponseBuilder } from "@/lib/helper/apiResponse";
import { PasswordHasher } from "@/lib/helper/hash";
import { JwtService } from "@/lib/helper/JWTService";
import { AuthenticationUseCase } from "@/usecases/AuthenticationUseCase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const repo = new AuthenticationRepositoryPrisma();
  const hasher = new PasswordHasher();
  const jwt = new JwtService(process.env.SECRET_KEY || "");
  const authUseCase = new AuthenticationUseCase(repo, hasher, jwt);

  try {
    const result = await authUseCase.login(username, password);
    return NextResponse.json(APIResponseBuilder.success(result));
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
