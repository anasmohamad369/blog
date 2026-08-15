"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/lib/types";
import { AdConfig } from "@/lib/ads";
import { Search, ArrowUpRight, SearchX, ChevronLeft, ChevronRight, Megaphone, ExternalLink } from "lucide-react";

interface BlogListClientProps {
  initialBlogs: Blog[];
  categories: string[];
  heroAd?: AdConfig;
}

export default function BlogListClient({ initialBlogs, categories, heroAd }: BlogListClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtered and sorted blogs
  const filteredBlogs = useMemo(() => {
    let result = [...initialBlogs];

    if (selectedCategory && selectedCategory !== "All") {
      result = result.filter((b) => b.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.content.toLowerCase().includes(q) ||
          (b.tags && b.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Sort latest first
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return result;
  }, [initialBlogs, search, selectedCategory]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage) || 1;
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBlogs.slice(start, start + itemsPerPage);
  }, [filteredBlogs, currentPage, itemsPerPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat === selectedCategory ? "" : cat);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Title, Description, Category Navigation & Sponsored Ad */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                Latest Blogs
              </h1>
              <p className="text-base text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                Explore technical guides, electrical grounding best practices, lightning protection standards, and safety insights compiled by experts.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Filter by Topic
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isActive = (selectedCategory || "All") === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat === "All" ? "" : cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                        isActive
                          ? "bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 border-slate-900 dark:border-emerald-500 shadow-sm"
                          : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sponsored Advertisement Card (Only displayed while seeing blog) */}
            {heroAd && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      <Megaphone className="w-3.5 h-3.5" />
                      <span>Sponsored Ad</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Featured</span>
                  </div>

                  <a
                    href={heroAd.linkUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block space-y-3"
                  >
                    <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={heroAd.imageUrl || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop"}
                        alt={heroAd.title || "Featured Sponsor"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex items-center justify-between text-slate-900 dark:text-white font-bold text-xs">
                      <span className="line-clamp-2">{heroAd.title || "Featured Product Announcement"}</span>
                      <ExternalLink className="w-4 h-4 text-emerald-500 ml-2 flex-shrink-0" />
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Search Bar & Stacked List Cards */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search articles, categories, or keywords..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50/80 dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-slate-900 dark:text-white"
              />
            </div>

            {/* Stacked Article List */}
            {paginatedBlogs.length > 0 ? (
              <div className="space-y-4">
                {paginatedBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.slug}`}
                    className="group block bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="space-y-3">
                      {/* Meta header: Category Badge & Date */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold uppercase tracking-wider text-amber-600 dark:text-emerald-400">
                            {blog.category}
                          </span>
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <span className="text-slate-400 dark:text-slate-500 font-medium">
                            {new Date(blog.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        {/* Top-right arrow icon */}
                        <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-all">
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                        {blog.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal">
                        {blog.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
                <SearchX className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Articles Found</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No blog articles match your current search query or selected category.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("");
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-1 text-xs font-semibold text-slate-600 dark:text-slate-400 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <span className="text-xs text-slate-400 font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-1 text-xs font-semibold text-slate-600 dark:text-slate-400 disabled:opacity-40"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
