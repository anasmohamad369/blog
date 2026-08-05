import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, Clock, ArrowLeft, User, ShieldCheck } from "lucide-react";
import { getBlogBySlug, getRelatedBlogs } from "@/lib/blogs";
import { calculateReadingTime } from "@/lib/utils";
import BlogContent from "@/components/BlogContent";
import BlogBanner from "@/components/BlogBanner";
import RelatedBlogs from "@/components/RelatedBlogs";
import BlogSidebar from "@/components/BlogSidebar";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";

interface BlogSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Earthing Solutions",
    };
  }

  return {
    title: `${blog.seoTitle || blog.title} | Earthing Solutions`,
    description: blog.seoDescription || blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.coverImage }],
    },
  };
}

export default async function SingleBlogPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog.category, blog.slug, 3);
  const readingTime = calculateReadingTime(blog.content);
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back to Blogs button */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors bg-white dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blogs</span>
          </Link>
        </div>

        {/* Article Header Header & Meta */}
        <header className="space-y-6 max-w-4xl">
          <div className="flex items-center space-x-3">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-950 dark:text-emerald-100 bg-emerald-300 dark:bg-emerald-800/90 rounded-full shadow-sm">
              {blog.category}
            </span>
            <span className="text-xs font-semibold text-slate-400">Article</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {blog.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {blog.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">Earthing Solutions Team</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-emerald-500" />
                <span>{formattedDate}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            <ShareButtons title={blog.title} />
          </div>
        </header>

        {/* Large Hero Image */}
        <div className="relative h-[320px] sm:h-[480px] lg:h-[560px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900">
          <Image
            src={blog.coverImage || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop"}
            alt={blog.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Content Layout with Main Article & Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Table of Contents */}
            <TableOfContents content={blog.content} />

            {/* Rich Blog Body */}
            <BlogContent content={blog.content} />

            {/* Full-width Advertisement Banner Image/Text overlay below article */}
            <BlogBanner
              bannerImage={blog.bannerImage || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop"}
              heading="Need Professional Earthing Installation?"
              ctaText="Contact Our Experts"
            />
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4">
            <BlogSidebar blog={blog} />
          </div>
        </div>

        {/* Related Articles Section */}
        <RelatedBlogs blogs={relatedBlogs} />
      </div>
    </article>
  );
}
