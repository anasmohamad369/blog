import { prisma } from "./prisma";

export interface AdConfig {
  id: string;
  imageUrl: string;
  linkUrl: string;
  title?: string;
  updatedAt?: string;
}

export async function getHeroAd(): Promise<AdConfig> {
  try {
    const data = await prisma.blog.findUnique({
      where: { id: "hero-ad" },
    });

    if (data) {
      return {
        id: data.id,
        imageUrl: data.coverImage || "",
        linkUrl: data.excerpt || "",
        title: data.title || "",
        updatedAt: data.updatedAt.toISOString(),
      };
    }
  } catch (err) {
    console.error("getHeroAd exception:", err);
  }
  return {
    id: "hero-ad",
    imageUrl: "",
    linkUrl: "",
    title: "",
  };
}

export async function updateHeroAd(input: { imageUrl: string; linkUrl: string; title?: string }): Promise<AdConfig> {
  const data = {
    title: input.title || "Featured Advertisement",
    slug: "hero-ad-config",
    excerpt: input.linkUrl,
    content: "Hero Advertisement Configuration",
    coverImage: input.imageUrl,
    bannerImage: "",
    category: "Advertisement",
    tags: "ad",
    published: false,
  };

  const updated = await prisma.blog.upsert({
    where: { id: "hero-ad" },
    update: data,
    create: { id: "hero-ad", ...data },
  });

  return {
    id: updated.id,
    imageUrl: updated.coverImage,
    linkUrl: updated.excerpt,
    title: updated.title,
    updatedAt: updated.updatedAt.toISOString(),
  };
}
