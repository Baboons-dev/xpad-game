import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // List of public paths that don't require authentication
  const publicPaths = ['/authenticate'];
  
  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // Handle public paths
  if (isPublicPath) {
    if (token) {
      // If user is already logged in, redirect to home
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // Protected routes
  if (!token) {
    // Save the attempted URL to redirect back after login
    const searchParams = new URLSearchParams();
    searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(new URL(`/authenticate?${searchParams.toString()}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public/*)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}