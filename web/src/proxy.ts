// src/proxy.ts

import { NextRequest, NextResponse } from "next/server"

const PRIVATE_ROUTE_PREFIXES = [
  '/dashboard',
  '/profile',
  '/teams',
  '/notifications',
  '/logout',
];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('access_token')?.value;

    const isPrivateRoute = PRIVATE_ROUTE_PREFIXES.some((route) =>
      pathname.startsWith(route)
    );

    // Not authenticated
    if (!token && isPrivateRoute) {
      return NextResponse.redirect(
        new URL('/auth/login', request.url)
      );
    }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
}