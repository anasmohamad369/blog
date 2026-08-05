import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Try uploading to Supabase Storage bucket 'blog-images'
    try {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { data, error } = await supabase.storage
        .from("blog-images")
        .upload(fileName, buffer, {
          contentType: file.type || "image/png",
          upsert: true,
        });

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage
          .from("blog-images")
          .getPublicUrl(data.path);

        if (publicUrlData?.publicUrl) {
          return NextResponse.json({ url: publicUrlData.publicUrl }, { status: 200 });
        }
      }
    } catch (supaErr) {
      console.warn("Supabase upload attempted, falling back to local storage:", supaErr);
    }

    // 2. Save file locally in public/uploads/ so EVERY uploaded image is saved and served 100% reliably
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const safeFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(uploadsDir, safeFileName);

    await fs.promises.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${safeFileName}`;
    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
