import { NextRequest, NextResponse } from "next/server";
import { getAllBlogs, createBlog } from "@/lib/blogs";
import { revalidatePath } from "next/cache";

export const revalidate = 300;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "6", 10);

    const result = await getAllBlogs({ search, category, page, limit });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json({ error: error?.message || "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.excerpt || !body.content || !body.category || !body.coverImage) {
      return NextResponse.json(
        { error: "Missing required fields: title, excerpt, content, category, coverImage" },
        { status: 400 }
      );
    }

    const newBlog = await createBlog(body);

    try {
      revalidatePath("/");
      revalidatePath("/blog");
    } catch (e) {
      console.warn("Revalidate path warning:", e);
    }

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/blogs error:", error);
    return NextResponse.json({ error: error?.message || "Failed to create blog" }, { status: 500 });
  }
}
