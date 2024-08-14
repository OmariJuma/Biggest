// import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// function isValidCookieName(name: string) {
//   return typeof name === 'string' && /^[a-zA-Z0-9-_]+$/.test(name);
// }

// function isValidCookieValue(value: string) {
//   return typeof value === 'string' && value.length > 0;
// }

// export async function POST(request: NextRequest) {
//   const { name, value } = await request.json();

//   if (!isValidCookieName(name) || !isValidCookieValue(value)) {
//     return NextResponse.json({ error: 'Invalid cookie name or value' }, { status: 400 });
//   }
//   cookies().set(name, value, {
//     httpOnly: true,
//     secure: true,
//     maxAge: 31536000,
//     sameSite: 'strict',
//     path: '/',
//   });

//   return NextResponse.json({ message: 'Cookie set successfully' }, { status: 200 });
// }

// export async function GET() {
//   return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
// }
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

function isValidCookieName(name: string) {
  return typeof name === "string" && /^[a-zA-Z0-9-_]+$/.test(name);
}

function isValidCookieValue(value: any) {
  if (typeof value === "string") {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every(v => typeof v === "string");
  }
  return false;
}

export async function POST(request: NextRequest) {
  const { name, value } = await request.json();

  if (!isValidCookieName(name) || !isValidCookieValue(value)) {
    return NextResponse.json(
      { error: "Invalid cookie name or value" },
      { status: 400 }
    );
  }

  const cookieValue = typeof value === "string" ? value : JSON.stringify(value);

  cookies().set(name, cookieValue, {
    httpOnly: true,
    secure: true,
    maxAge: 31536000,
    path: "/",
    sameSite: 'strict', // Optional: Add SameSite attribute for security
  });

  return NextResponse.json({ message: "Cookie set successfully" }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
