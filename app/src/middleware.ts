import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser");

  if (!currentUser && request.nextUrl.pathname.startsWith("/protected")) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (currentUser && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/Home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*", "/auth/:path*"],
};
