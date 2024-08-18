import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name } = await request.json();
  console.log(name);
  if (!cookies().has(name)) {
    return NextResponse.json({ error: "Cookie not found" }, { status: 404 });
  }
  cookies().delete(name);
 return NextResponse.json({ message: "Cookie removed" }, { status: 200 });
}
