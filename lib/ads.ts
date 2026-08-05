import { supabase } from "./supabase";

export interface AdConfig {
  id: string;
  imageUrl: string;
  linkUrl: string;
  title?: string;
  updatedAt?: string;
}

const DEFAULT_AD: AdConfig = {
  id: "hero-ad",
  imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
  linkUrl: "https://earthingsolutions.com",
  title: "Featured Earthing Equipment Banner",
};

export async function getHeroAd(): Promise<AdConfig> {
  try {
    const { data, error } = await supabase
      .from("Blog")
      .select("*")
      .eq("id", "hero-ad")
      .maybeSingle();

    if (!error && data) {
      return {
        id: data.id,
        imageUrl: data.coverImage || DEFAULT_AD.imageUrl,
        linkUrl: data.excerpt || DEFAULT_AD.linkUrl,
        title: data.title || DEFAULT_AD.title,
        updatedAt: data.updatedAt,
      };
    }
  } catch (err) {
    console.warn("getHeroAd warning:", err);
  }
  return DEFAULT_AD;
}

export async function updateHeroAd(input: { imageUrl: string; linkUrl: string; title?: string }): Promise<AdConfig> {
  const now = new Date().toISOString();
  const row = {
    id: "hero-ad",
    title: input.title || "Featured Advertisement",
    slug: "hero-ad-config",
    excerpt: input.linkUrl,
    content: "Hero Advertisement Configuration",
    coverImage: input.imageUrl,
    bannerImage: "",
    category: "Advertisement",
    tags: "ad",
    published: false,
    createdAt: now,
    updatedAt: now,
  };

  try {
    const { data, error } = await supabase
      .from("Blog")
      .upsert([row])
      .select()
      .single();

    if (!error && data) {
      return {
        id: data.id,
        imageUrl: data.coverImage,
        linkUrl: data.excerpt,
        title: data.title,
        updatedAt: data.updatedAt,
      };
    }
    if (error) {
      console.warn("Supabase Ad save warning:", error.message);
    }
  } catch (err) {
    console.warn("updateHeroAd exception:", err);
  }

  return {
    id: "hero-ad",
    imageUrl: input.imageUrl,
    linkUrl: input.linkUrl,
    title: input.title || "Featured Advertisement",
    updatedAt: now,
  };
}
