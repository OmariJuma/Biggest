import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// This function can be marked async if using await inside
export function middleware(request: NextRequest) {
  const token = cookies().get("token"); 
  console.log("Middleware running");
  console.log(token);
  // Check if the request URL matches the specified paths
  if (
    request.url.includes("/admin") ||
    request.url.includes("/dashboard") ||
    request.url.includes("/addProduct")
  ) {
    // Check if the token exists
    if (!token) {
      console.log("Redirecting to login page");
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }
  if(request.url.includes("/login") && token){
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/admin/:path*',
    '/dashboard/:path*',
    '/addProduct/:path*',
  ],
};