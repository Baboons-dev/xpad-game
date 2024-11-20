// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("running");
  //   const token = localStorage.getItem("token"); // Retrieve token from cookies
  //   console.log("token", token);
  //   const url = req.nextUrl.clone();

  //   // If no token, redirect to login page
  //   if (!token) {
  //     url.pathname = "/authenticate";
  //     return NextResponse.redirect(url);
  //   }

  return NextResponse.next(); // Allow the request
}

// Apply middleware to specific routes
// export const config = {
//   matcher: [
//     "/battle/:path*", // Protect dashboard and subroutes
//     "/ixo/:path*", // Protect profile and subroutes
//     "/layerx/:path*", // Protect settings and subroutes
//     "/login", // Handle login redirection
//     "/profile/:path*",
//     "/rankOverview/:path*",
//     "/xpHistory/:path*",
//     "/xplay/:path*",
//     // "/dashboard/:path*", "/profile/:path*"
//   ], // Secure these routes
// };
