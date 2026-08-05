"use client";

import { useState, useMemo } from "react";
import BlogHero from "@/components/BlogHero";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import { Blog } from "@/lib/types";
import { SearchX, ChevronLeft, ChevronRight } from "lucide-react";

interface BlogListClientProps {
  initialBlogs: Blog[];
  categories: string[];
}

export default function BlogListClient({ initialBlogs, categories }: BlogListClientProps) {
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

    // Latest first
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
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Blog Page Hero */}
      <BlogHero
        title="Insights, Guides & Industry Knowledge"
        subtitle="Explore expert articles, practical tips, installation guides, and the latest innovations in earthing and electrical safety to help you make informed decisions."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search & Category Filter Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-md space-y-6">
          <div className="max-w-xl">
            <SearchBar value={search} onChange={handleSearchChange} />
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory || "All"}
              onSelectCategory={handleCategoryChange}
            />
          </div>
        </div>

        {/* Results Stats */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 px-1">
          <span>
            Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? "article" : "articles"}
            {selectedCategory ? ` in "${selectedCategory}"` : ""}
            {search ? ` matching "${search}"` : ""}
          </span>
          <span>Page {currentPage} of {totalPages}</span>
        </div>

        {/* Blog Grid or Empty State */}
        {paginatedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Articles Found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 px-6">
              We couldn't find any articles matching your search query or selected category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("");
                setCurrentPage(1);
              }}
              className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-3 pt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-full border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              title="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-full font-bold text-xs transition-all ${
                    currentPage === pageNum
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              title="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
