import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import createMiddleware from "next-intl/middleware";

const secret = new TextEncoder().encode(process.env.SECRET_KEY!);

const intlMiddleware = createMiddleware({
  locales: ["en", "id"],
  defaultLocale: "id",
  localePrefix: "always",
  localeDetection: false,
});

function redirectToLogin(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/id/login", req.url));
  res.cookies.set("token", "", { expires: new Date(0), path: "/" });
  return res;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  const intlResponse = intlMiddleware(req);
  if (intlResponse?.headers.get("location")) {
    return intlResponse;
  }

  if (token) {
    try {
      await jwtVerify(token, secret);

      if (pathname.includes("/login")) {
        return NextResponse.redirect(new URL("/id/dashboard", req.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Invalid token:", error);
      return redirectToLogin(req);
    }
  }

  if (!token && pathname.includes("/dashboard")) {
    return redirectToLogin(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude API routes & static files
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/",
  ],
};
