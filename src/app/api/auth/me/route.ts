import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { APIResponseBuilder } from "@/lib/api/apiResponse";
import { HttpStatus } from "@/lib/constant/responseCode";
import { HttpErrorHandler } from "@/lib/http/HTTPErrorHandler";
import { UserRepositoryPrisma } from "@/infrastructure/user/UserRepository";

const secret = new TextEncoder().encode(process.env.SECRET_KEY);

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(APIResponseBuilder.unauthorized("Unauthorized"), {
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId as string;

    if (!userId) {
      return NextResponse.json(APIResponseBuilder.unauthorized("Invalid token"), {
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    const userRepo = new UserRepositoryPrisma();
    const user = await userRepo.getById(userId);

    const response = NextResponse.json(
      APIResponseBuilder.success({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
      }),
      {
        status: HttpStatus.OK,
      }
    );

    return response;
  } catch (error) {
    return HttpErrorHandler.handle(error);
  }
}
