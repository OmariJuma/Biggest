import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

function isValidCookieName(name: string) {
  return typeof name === 'string' && /^[a-zA-Z0-9-_]+$/.test(name);
}

function isValidCookieValue(value: string) {
  return typeof value === 'string' && value.length > 0;
}

export async function POST(request: NextRequest) {
  const { name, value } = await request.json();

  if (!isValidCookieName(name) || !isValidCookieValue(value)) {
    return NextResponse.json({ error: 'Invalid cookie name or value' }, { status: 400 });
  }

  cookies().set(name, value, {
    httpOnly: true,
    secure: true,
    maxAge: 31536000,
    path: '/',
  });

  return NextResponse.json({ message: 'Cookie set successfully' }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}