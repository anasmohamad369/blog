import { Blog, CreateBlogInput, UpdateBlogInput, BlogFilterOptions, PaginatedBlogsResponse } from "./types";
import { prisma } from "./prisma";
import { calculateReadingTime, generateSlug, parseTags } from "./utils";

export { calculateReadingTime, generateSlug, parseTags };

export interface BannerData {
  imageUrl: string;
  linkUrl: string;
  title: string;
}

export function parseBannerData(val?: string): BannerData {
  if (!val) return { imageUrl: "", linkUrl: "", title: "" };
  if (typeof val === "string" && val.trim().startsWith("{") && val.trim().endsWith("}")) {
    try {
      const parsed = JSON.parse(val);
      return {
        imageUrl: parsed.imageUrl || "",
        linkUrl: parsed.linkUrl || "",
        title: parsed.title || "",
      };
    } catch (e) {}
  }
  return { imageUrl: val, linkUrl: "", title: "" };
}

export function stringifyBannerData(data: { imageUrl: string; linkUrl?: string; title?: string }): string {
  if (!data.imageUrl) return "";
  if (!data.linkUrl && !data.title) return data.imageUrl;
  return JSON.stringify({
    imageUrl: data.imageUrl,
    linkUrl: data.linkUrl || "",
    title: data.title || "",
  });
}

function formatRow(row: any): Blog {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.coverImage || "",
    bannerImage: row.bannerImage || "",
    category: row.category,
    tags: parseTags(row.tags),
    seoTitle: row.seoTitle || row.title,
    seoDescription: row.seoDescription || row.excerpt,
    published: row.published ?? true,
    createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : row.createdAt || new Date().toISOString(),
    updatedAt: row.updatedAt instanceof Date ? row.updatedAt.toISOString() : row.updatedAt || new Date().toISOString(),
  };
}

export async function getAllBlogs(options: BlogFilterOptions = {}): Promise<PaginatedBlogsResponse> {
  const { search = "", category = "", page = 1, limit = 6 } = options;

  try {
    const where: any = {
      id: { notIn: ["hero-ad", "admin-config"] },
      published: true,
    };

    if (category && category !== "All") {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
        { tags: { contains: search, mode: "insensitive" } },
      ];
    }

    const [data, count] = await Promise.all([
      prisma.blog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blog.count({ where }),
    ]);

    const blogs = data.map(formatRow);
    const total = count || blogs.length;
    const totalPages = Math.ceil(total / limit) || 1;

    const catData = await prisma.blog.findMany({
      where: { id: { notIn: ["hero-ad", "admin-config"] } },
      select: { category: true },
      distinct: ["category"],
    });
    const distinctCat = catData.map((c) => c.category);
    const categories = ["All", ...distinctCat];

    return { blogs, total, page, totalPages, categories };
  } catch (error) {
    console.error("getAllBlogs error:", error);
    return { blogs: [], total: 0, page: 1, totalPages: 1, categories: ["All"] };
  }
}

export async function getLatestBlogs(limit = 3): Promise<Blog[]> {
  try {
    const data = await prisma.blog.findMany({
      where: {
        id: { notIn: ["hero-ad", "admin-config"] },
        published: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return data.map(formatRow);
  } catch (error) {
    console.error("getLatestBlogs error:", error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const data = await prisma.blog.findUnique({
      where: { slug },
    });
    if (!data) return null;
    return formatRow(data);
  } catch (error) {
    console.error("getBlogBySlug error:", error);
    return null;
  }
}

export async function getBlogById(id: string): Promise<Blog | null> {
  try {
    const data = await prisma.blog.findUnique({
      where: { id },
    });
    if (!data) return null;
    return formatRow(data);
  } catch (error) {
    console.error("getBlogById error:", error);
    return null;
  }
}

export async function getRelatedBlogs(category: string, currentSlug: string, limit = 3): Promise<Blog[]> {
  try {
    const data = await prisma.blog.findMany({
      where: {
        id: { notIn: ["hero-ad", "admin-config"] },
        category,
        slug: { not: currentSlug },
        published: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return data.map(formatRow);
  } catch (error) {
    console.error("getRelatedBlogs error:", error);
    return [];
  }
}

export async function createBlog(input: CreateBlogInput): Promise<Blog> {
  const slug = input.slug ? generateSlug(input.slug) : generateSlug(input.title);
  const tagsString = Array.isArray(input.tags) ? input.tags.join(", ") : input.tags || "";

  const created = await prisma.blog.create({
    data: {
      title: input.title.trim(),
      slug,
      excerpt: input.excerpt.trim(),
      content: input.content,
      coverImage: input.coverImage,
      bannerImage: input.bannerImage || "",
      category: input.category,
      tags: tagsString,
      seoTitle: input.seoTitle || input.title,
      seoDescription: input.seoDescription || input.excerpt,
      published: input.published ?? true,
    },
  });

  return formatRow(created);
}

export async function updateBlog(input: UpdateBlogInput): Promise<Blog | null> {
  const tagsString = input.tags !== undefined
    ? (Array.isArray(input.tags) ? input.tags.join(", ") : input.tags)
    : undefined;

  const updateData: any = {};
  if (input.title) updateData.title = input.title.trim();
  if (input.slug) updateData.slug = generateSlug(input.slug);
  if (input.excerpt) updateData.excerpt = input.excerpt.trim();
  if (input.content) updateData.content = input.content;
  if (input.coverImage) updateData.coverImage = input.coverImage;
  if (input.bannerImage !== undefined) updateData.bannerImage = input.bannerImage;
  if (input.category) updateData.category = input.category;
  if (tagsString !== undefined) updateData.tags = tagsString;
  if (input.seoTitle !== undefined) updateData.seoTitle = input.seoTitle;
  if (input.seoDescription !== undefined) updateData.seoDescription = input.seoDescription;
  if (input.published !== undefined) updateData.published = input.published;

  const updated = await prisma.blog.update({
    where: { id: input.id },
    data: updateData,
  });

  return formatRow(updated);
}

export async function deleteBlog(id: string): Promise<boolean> {
  try {
    await prisma.blog.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error("deleteBlog error:", error);
    return false;
  }
}
