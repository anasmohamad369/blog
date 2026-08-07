import { NextRequest, NextResponse } from "next/server";
import { isValidSession } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;
  const valid = await isValidSession(token || "");

  if (valid) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
