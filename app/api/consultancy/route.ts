import { NextRequest, NextResponse } from "next/server";
import {
  createConsultancyRequest,
  getConsultancyRequests,
  updateConsultancyStatus,
  deleteConsultancyRequest,
  EnquiryStatus,
} from "@/lib/consultancy";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const requests = await getConsultancyRequests();
    return NextResponse.json({ requests });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to fetch requests" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Missing required fields: name, email, message" }, { status: 400 });
    }

    const newRequest = await createConsultancyRequest({
      name: body.name,
      email: body.email,
      phone: body.phone,
      category: body.category,
      message: body.message,
    });

    return NextResponse.json(
      { message: "Your consultation request has been sent! Our expert team will email you shortly.", request: newRequest },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to submit consultation request" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const success = await updateConsultancyStatus(id, status as EnquiryStatus);
    if (!success) {
      return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
    }

    return NextResponse.json({ message: "Status updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update status" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    const success = await deleteConsultancyRequest(id);
    if (!success) {
      return NextResponse.json({ error: "Failed to delete request" }, { status: 500 });
    }

    return NextResponse.json({ message: "Enquiry deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to delete request" }, { status: 500 });
  }
}
