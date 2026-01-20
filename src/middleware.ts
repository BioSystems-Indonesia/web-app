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

// Role-based route permissions
const routePermissions: Record<string, string[]> = {
  "/dashboard": ["ADMIN", "PRODUCT_SPECIALIST", "HUMAN_RESOURCE", "DG"],
  "/dashboard/products": ["ADMIN", "PRODUCT_SPECIALIST", "DG"],
  "/dashboard/posts": ["ADMIN", "PRODUCT_SPECIALIST", "DG"],
  // "/dashboard/events": ["ADMIN", "PRODUCT_SPECIALIST"],
  // "/dashboard/career": ["ADMIN", "HUMAN_RESOURCE"],
  // "/dashboard/contact": ["ADMIN"],
  // "/dashboard/users": ["ADMIN"],
  "/dashboard/lis": ["ADMIN"],
};

function redirectToLogin(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/id/login", req.url));
  res.cookies.set("token", "", { expires: new Date(0), path: "/" });
  return res;
}

function redirectToUnauthorized(req: NextRequest) {
  return NextResponse.redirect(new URL("/id/", req.url));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // Skip intl middleware for SEO files
  if (pathname === "/sitemap.xml" || pathname === "/robots.txt") {
    return NextResponse.next();
  }

  const intlResponse = intlMiddleware(req);
  if (intlResponse?.headers.get("location")) {
    return intlResponse;
  }

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      const userRole = payload.role as string;

      if (pathname.includes("/login")) {
        return NextResponse.redirect(new URL("/id/dashboard/products", req.url));
      }

      // Check role-based access
      if (pathname.includes("/dashboard")) {
        // Extract the route pattern from pathname (remove locale)
        const routePattern = pathname.replace(/^\/(en|id)/, "");

        // Find matching permission
        const matchedRoute = Object.keys(routePermissions).find(
          (route) => routePattern === route || routePattern.startsWith(route + "/")
        );

        if (matchedRoute) {
          const allowedRoles = routePermissions[matchedRoute];

          // Check if user's role is allowed for this route
          if (!allowedRoles.includes(userRole)) {
            console.log(`Access denied for ${userRole} to ${routePattern}`);
            return redirectToUnauthorized(req);
          }
        }
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
    // Exclude API routes, static files, and SEO files
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|logo.png|og-image.jpg).*)",
    "/",
  ],
};
