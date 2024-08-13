import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

function isValidCookieName(name: string) {
  return typeof name === 'string' && /^[a-zA-Z0-9-_]+$/.test(name);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name || !isValidCookieName(name)) {
    return NextResponse.json({ error: 'Invalid cookie name' }, { status: 400 });
  }

  const cookieValue = cookies().get(name);
  if (!cookieValue) {
    return NextResponse.json({ message: 'You have no cookie' }, { status: 404 });
  }

  return NextResponse.json({ value: cookieValue }, { status: 200 });
}