import { NextRequest, NextResponse } from "next/server";
import { verifyAdminPassword, setAdminPassword, isValidSession } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_session")?.value;
    const valid = await isValidSession(token || "");

    if (!valid) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Current password and new password are required" }, { status: 400 });
    }

    if (newPassword.length < 3) {
      return NextResponse.json({ error: "New password must be at least 3 characters long" }, { status: 400 });
    }

    const isCurrentValid = await verifyAdminPassword(currentPassword);
    if (!isCurrentValid) {
      return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
    }

    const success = await setAdminPassword(newPassword);
    if (!success) {
      return NextResponse.json({ error: "Failed to update password in database" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Admin password updated successfully!" });
  } catch (error: any) {
    console.error("Change password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
