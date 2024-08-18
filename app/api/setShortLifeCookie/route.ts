import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

function isValidCookieName(name: string) {
  return typeof name === "string" && /^[a-zA-Z0-9-_]+$/.test(name);
}

function isValidCookieValue(value: string) {
  return typeof value === "string" && value.length > 0;
}

function isValidTime(time: number): boolean {
  return time > Date.now();
}

export async function POST(request: NextRequest) {
  const { name, value, time } = await request.json();
  console.log(time);
  if (
    !isValidCookieName(name) ||
    !isValidCookieValue(value) ||
    isValidTime(time)
  ) {
    console.log(isValidTime(time));
    return NextResponse.json(
      { error: "Invalid cookie name, value or time" },
      { status: 400 }
    );
  }
  cookies().set(name, value, {
    httpOnly: true,
    secure: true,
    maxAge: time,
    sameSite: "lax",
    path: "/",
  });

  return NextResponse.json(
    { message: "Cookie set successfully" },
    { status: 200 }
  );
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
