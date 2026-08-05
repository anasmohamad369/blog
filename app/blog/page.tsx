import { getAllBlogs } from "@/lib/blogs";
import BlogListClient from "./BlogListClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Blog Articles & Guides | Earthing Solutions",
  description: "Browse comprehensive articles on earthing systems, chemical grounding, lightning protection, IEEE compliance, and earth pit maintenance.",
};

export default async function BlogListPage() {
  const data = await getAllBlogs({ limit: 100 });

  return <BlogListClient initialBlogs={data.blogs} categories={data.categories} />;
}
