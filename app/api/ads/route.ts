import { NextRequest, NextResponse } from "next/server";
import { getHeroAd, updateHeroAd } from "@/lib/ads";
import { revalidatePath } from "next/cache";

// Revalidate cache every 5 minutes (300 seconds)
export const revalidate = 300;

export async function GET() {
  try {
    const ad = await getHeroAd();
    return NextResponse.json(ad);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to fetch ad config" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.imageUrl) {
      return NextResponse.json({ error: "Missing required field: imageUrl" }, { status: 400 });
    }

    const updated = await updateHeroAd({
      imageUrl: body.imageUrl,
      linkUrl: body.linkUrl || "#",
      title: body.title,
    });

    // Instantly invalidate Home Page cache upon Admin Ad save
    try {
      revalidatePath("/");
    } catch (e) {
      console.warn("Revalidate path warning:", e);
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to update ad config" }, { status: 500 });
  }
}
