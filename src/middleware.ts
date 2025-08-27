import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SECRET_KEY);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (token) {
    try {
      await jwtVerify(token, secret);

      if (pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return NextResponse.next();
    } catch (err) {
      console.error("Invalid token:", err);
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.set("token", "", { expires: new Date(0), path: "/" });
      return res;
    }
  }

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
