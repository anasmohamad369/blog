import { Blog, CreateBlogInput, UpdateBlogInput, BlogFilterOptions, PaginatedBlogsResponse } from "./types";
import { supabase } from "./supabase";
import { calculateReadingTime, generateSlug, parseTags } from "./utils";

export { calculateReadingTime, generateSlug, parseTags };

// The table is "Blog" (capital B) with camelCase columns as created in Supabase
const TABLE = "Blog";

// Format Supabase row into Blog interface
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
    createdAt: row.createdAt || new Date().toISOString(),
    updatedAt: row.updatedAt || new Date().toISOString(),
  };
}

export async function getAllBlogs(options: BlogFilterOptions = {}): Promise<PaginatedBlogsResponse> {
  const { search = "", category = "", page = 1, limit = 6 } = options;

  try {
    let query = supabase.from(TABLE).select("*", { count: "exact" });
    query = query.neq("id", "hero-ad");
    query = query.neq("id", "admin-config");
    query = query.eq("published", true);

    if (category && category !== "All") {
      query = query.eq("category", category);
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%,category.ilike.%${search}%,tags.ilike.%${search}%`);
    }

    query = query.order("createdAt", { ascending: false });

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.error("getAllBlogs error:", error);
      return { blogs: [], total: 0, page: 1, totalPages: 1, categories: ["All"] };
    }

    const blogs = (data || []).map(formatRow);
    const total = count || blogs.length;
    const totalPages = Math.ceil(total / limit) || 1;

    // Fetch distinct categories
    const { data: catData } = await supabase.from(TABLE).select("category");
    const distinctCat = catData ? Array.from(new Set(catData.map((c: any) => c.category))) : [];
    const categories = ["All", ...distinctCat];

    return { blogs, total, page, totalPages, categories };
  } catch (error) {
    console.error("getAllBlogs error:", error);
    return { blogs: [], total: 0, page: 1, totalPages: 1, categories: ["All"] };
  }
}

export async function getLatestBlogs(limit = 3): Promise<Blog[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .neq("id", "hero-ad")
    .eq("published", true)
    .order("createdAt", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data.map(formatRow);
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return formatRow(data);
}

export async function getBlogById(id: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return formatRow(data);
}

export async function getRelatedBlogs(category: string, currentSlug: string, limit = 3): Promise<Blog[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .neq("id", "hero-ad")
    .eq("category", category)
    .neq("slug", currentSlug)
    .eq("published", true)
    .order("createdAt", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data.map(formatRow);
}

export async function createBlog(input: CreateBlogInput): Promise<Blog> {
  const slug = input.slug ? generateSlug(input.slug) : generateSlug(input.title);
  const tagsString = Array.isArray(input.tags) ? input.tags.join(", ") : input.tags || "";
  const now = new Date().toISOString();
  const id = "blog-" + Date.now();

  const row = {
    id,
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
    createdAt: now,
    updatedAt: now,
  };

  const { data, error } = await supabase
    .from(TABLE)
    .insert([row])
    .select()
    .single();

  if (error) {
    console.error("createBlog error:", error);
    throw new Error(error.message);
  }

  return formatRow(data);
}

export async function updateBlog(input: UpdateBlogInput): Promise<Blog | null> {
  const now = new Date().toISOString();
  const tagsString = input.tags !== undefined
    ? (Array.isArray(input.tags) ? input.tags.join(", ") : input.tags)
    : undefined;

  const updateData: any = { updatedAt: now };
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

  const { data, error } = await supabase
    .from(TABLE)
    .update(updateData)
    .eq("id", input.id)
    .select()
    .single();

  if (error) {
    console.error("updateBlog error:", error);
    throw new Error(error.message);
  }

  return formatRow(data);
}

export async function deleteBlog(id: string): Promise<boolean> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) {
    console.error("deleteBlog error:", error);
    return false;
  }
  return true;
}
