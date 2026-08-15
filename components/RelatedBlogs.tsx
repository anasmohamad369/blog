"use client";

import BlogCard from "./BlogCard";
import { Blog } from "@/lib/types";

interface RelatedBlogsProps {
  blogs: Blog[];
  heading?: string;
  subtitle?: string;
}

export default function RelatedBlogs({
  blogs,
  heading = "You May Also Like",
  subtitle = "Continue exploring articles related to this topic.",
}: RelatedBlogsProps) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="my-16 pt-12 border-t border-slate-200 dark:border-slate-800">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {heading}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {blogs.slice(0, 3).map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
