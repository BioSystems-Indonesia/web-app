import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { HttpStatus } from "@/lib/constant/responseCode";
import { APIResponseBuilder } from "@/lib/api/apiResponse";

const secret = new TextEncoder().encode(process.env.SECRET_KEY);

type RouteContext = {
  params?: Record<string, string>;
};

export function WithAuth(handler: (req: NextRequest, ctx?: RouteContext) => Promise<NextResponse>) {
  return async (req: NextRequest, ctx?: RouteContext) => {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(APIResponseBuilder.unauthorized("Unauthorized"), {
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    try {
      await jwtVerify(token, secret);
      return handler(req, ctx);
    } catch {
      return NextResponse.json(APIResponseBuilder.unauthorized("Invalid token"), {
        status: HttpStatus.UNAUTHORIZED,
      });
    }
  };
}
