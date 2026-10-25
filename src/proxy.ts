import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const { pathname, search } = request.nextUrl;

  // Protected Routes
  const protectedRoutes = [
    "/product",
    "/profile",
  ];

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute && !sessionCookie) {
    const loginUrl = new URL("/signin", request.url);

    loginUrl.searchParams.set(
      "callbackURL",
      pathname + search
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/product/:path*",
    "/profile/:path*",
  ],
};