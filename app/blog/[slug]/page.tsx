import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, Clock, ArrowLeft, User, Tag } from "lucide-react";
import { getBlogBySlug, getRelatedBlogs, parseBannerData } from "@/lib/blogs";
import { getHeroAd } from "@/lib/ads";
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

  const tagKeywords = blog.tags && blog.tags.length > 0 ? blog.tags : [blog.category, "Earthing", "Grounding", "Electrical Safety"];
  const allKeywords = Array.from(
    new Set([
      ...tagKeywords,
      blog.category,
      "Earthing",
      "Grounding",
      "Chemical Earthing",
      "Electrical Safety",
      "Lightning Protection",
      "IEEE 81",
      "IS 3043 Standards",
    ])
  );

  const titleText = `${blog.seoTitle || blog.title} | Earthing Solutions`;
  const descriptionText = blog.seoDescription || blog.excerpt;
  const pageUrl = `/blog/${blog.slug}`;
  const imageUrl = blog.coverImage || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop";

  return {
    title: titleText,
    description: descriptionText,
    keywords: allKeywords,
    authors: [{ name: "Earthing Solutions Technical Team" }],
    publisher: "Earthing Solutions Inc.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: titleText,
      description: descriptionText,
      url: pageUrl,
      siteName: "Earthing Solutions",
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      tags: tagKeywords,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: descriptionText,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function SingleBlogPage({ params }: BlogSlugPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const [relatedBlogs, heroAd] = await Promise.all([
    getRelatedBlogs(blog.category, blog.slug, 3),
    getHeroAd(),
  ]);

  const readingTime = calculateReadingTime(blog.content);
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const tagKeywords = blog.tags && blog.tags.length > 0 ? blog.tags : [blog.category, "Earthing", "Grounding", "Safety"];

  // Schema.org Article & Breadcrumb Structured JSON-LD Data for Search Engines
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt,
    "image": [blog.coverImage || "https://images.unsplash.com/photo-1621905251189-08b45d6a269e"],
    "datePublished": blog.createdAt,
    "dateModified": blog.updatedAt,
    "author": {
      "@type": "Organization",
      "name": "Structural Earthing Technical Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Structural Earthing",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.structuralearthing.com/logo.png"
      }
    },
    "keywords": tagKeywords.join(", "),
    "articleSection": blog.category,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.structuralearthing.com/blog/${blog.slug}`
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.structuralearthing.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.structuralearthing.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": `https://www.structuralearthing.com/blog/${blog.slug}`
      }
    ]
  };

  return (
    <article className="pb-24 pt-8" itemScope itemType="https://schema.org/TechArticle">
      {/* Inject Structured Data Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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

        {/* Article Header & Meta */}
        <header className="space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span
              itemProp="articleSection"
              className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-950 dark:text-emerald-100 bg-emerald-300 dark:bg-emerald-800/90 rounded-full shadow-sm"
            >
              {blog.category}
            </span>
            <span className="text-xs font-semibold text-slate-400">Technical Guide</span>
          </div>

          <h1 itemProp="headline" className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {blog.title}
          </h1>

          <p itemProp="description" className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {blog.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <span itemProp="author" className="font-semibold text-slate-900 dark:text-white">
                  Earthing Solutions Team
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-emerald-500" />
                <time itemProp="datePublished" dateTime={blog.createdAt}>{formattedDate}</time>
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
            itemProp="image"
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
            <div itemProp="articleBody">
              <BlogContent content={blog.content} />
            </div>

            {/* SEO Tag Badges & Indexing Section */}
            {tagKeywords && tagKeywords.length > 0 && (
              <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider">
                  <Tag className="w-4 h-4 text-emerald-500" />
                  <span>Article SEO Topics & Keywords</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {tagKeywords.map((tag, idx) => (
                    <Link
                      key={idx}
                      href={`/blog?search=${encodeURIComponent(tag)}`}
                      className="px-3.5 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-300/60 dark:border-emerald-800 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                      itemProp="keywords"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Full-width Advertisement Banner Image/Text overlay below article */}
            {(() => {
              const articleBanner = parseBannerData(blog.bannerImage);
              return (
                <BlogBanner
                  bannerImage={articleBanner.imageUrl || heroAd.imageUrl}
                  heading={articleBanner.title || heroAd.title || "Need Professional Earthing Installation?"}
                  ctaText="Visit Sponsor / Learn More"
                  ctaUrl={articleBanner.linkUrl || heroAd.linkUrl || "/#consultancy"}
                />
              );
            })()}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4">
            <BlogSidebar blog={blog} heroAd={heroAd} />
          </div>
        </div>

        {/* Related Articles Section */}
        <RelatedBlogs blogs={relatedBlogs} />
      </div>
    </article>
  );
}
