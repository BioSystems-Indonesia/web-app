import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import createMiddleware from "next-intl/middleware";

const secret = new TextEncoder().encode(process.env.SECRET_KEY);

const intlMiddleware = createMiddleware({
  locales: ["en", "id"],
  defaultLocale: "id",
  localePrefix: "always",
  localeDetection: false,
});

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Handle internationalization first
  const intlResponse = intlMiddleware(req);

  // If intl middleware returns a response (redirect), handle it
  if (intlResponse && intlResponse.headers.get("location")) {
    return intlResponse;
  }

  if (token) {
    try {
      await jwtVerify(token, secret);

      if (pathname.includes("/login")) {
        return NextResponse.redirect(new URL("/id/dashboard", req.url));
      }

      return NextResponse.next();
    } catch (err) {
      console.error("Invalid token:", err);
      const res = NextResponse.redirect(new URL("/id/login", req.url));
      res.cookies.set("token", "", { expires: new Date(0), path: "/" });
      return res;
    }
  }

  if (!token && pathname.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/id/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - Static files (_next/static, favicon.ico, etc.)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // Also match root path
    "/",
  ],
};
