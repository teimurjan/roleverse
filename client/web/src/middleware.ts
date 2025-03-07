import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/", "/followers", "/following"];
const authRoute = "/auth";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL(authRoute, request.url));
  }

  if (pathname.startsWith(authRoute) && token) {
    return NextResponse.redirect(new URL(protectedRoutes[0], request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: "/:path*",
};
