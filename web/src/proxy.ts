import { PRIVATE_ROUTE_PREFIXES, PUBLIC_ROUTES } from "@/config/routes";
import { NextRequest, NextResponse } from "next/server"

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('access_token')?.value;

    const isPrivateRoute = PRIVATE_ROUTE_PREFIXES.some((route) =>
      pathname.startsWith(route)
    );

    const isPublicRoute =
      pathname === '/' ||
      PUBLIC_ROUTES
        .filter(route => route !== '/')
        .some(route => pathname === route || pathname.startsWith(`${route}/`));

    // Not authenticated
    if (!token && isPrivateRoute) {
      return NextResponse.redirect(
        new URL('/auth/login', request.url)
      );
    }

    // Authenticated
    if (token && isPublicRoute) {
      return NextResponse.redirect(
        new URL('/dashboard', request.url)
      );
    }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
}