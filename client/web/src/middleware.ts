import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = [
  "/",
  "/feed",
  "/liked",
  "/explore",
  /^\/profile\/([0-9a-fA-F-]{36})$/,
  /^\/followers\/([0-9a-fA-F-]{36})$/,
  /^\/following\/([0-9a-fA-F-]{36})$/,
];
const authRoute = "/auth";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (
    protectedRoutes.some((route) =>
      typeof route === "string" ? pathname === route : route.test(pathname)
    ) &&
    !token
  ) {
    return NextResponse.redirect(new URL(authRoute, request.url));
  }

  if (pathname.startsWith(authRoute) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: "/:path*",
};
