"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/lib/types";
import AdManager from "@/components/AdManager";
import ConsultancyAdminViewer from "@/components/ConsultancyAdminViewer";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  Search,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  BookOpen,
  Headset,
  Megaphone,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

type AdminTab = "blogs" | "enquiries" | "ads";

export default function AdminBlogDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("blogs");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // Pagination for Blogs
  const [blogPage, setBlogPage] = useState(1);
  const blogPageSize = 6;

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blogs?limit=100");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs || []);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        setStatusMsg("Blog post deleted successfully.");
        setTimeout(() => setStatusMsg(null), 3000);
      }
    } catch (err) {
      console.error("Failed to delete blog:", err);
    } finally {
      setDeleteId(null);
    }
  };

  // Filtered & Paginated Blogs
  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalBlogItems = filteredBlogs.length;
  const totalBlogPages = Math.ceil(totalBlogItems / blogPageSize) || 1;
  const validBlogPage = Math.min(blogPage, totalBlogPages);
  const blogStartIndex = (validBlogPage - 1) * blogPageSize;
  const paginatedBlogs = filteredBlogs.slice(blogStartIndex, blogStartIndex + blogPageSize);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Dashboard Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Admin Management Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Separately manage blog articles, review client consultancy enquiries, and update advertisement banners.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Create New Article</span>
          </Link>
        </div>
      </div>

      {/* Main Tab Navigation Buttons */}
      <div className="flex items-center p-1.5 bg-slate-100 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl">
        <button
          onClick={() => setActiveTab("blogs")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
            activeTab === "blogs"
              ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Blog Articles ({blogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("enquiries")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
            activeTab === "enquiries"
              ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Headset className="w-4 h-4" />
          <span>Client Enquiries</span>
        </button>

        <button
          onClick={() => setActiveTab("ads")}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-2 ${
            activeTab === "ads"
              ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Ad Banners</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-4 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-sm font-semibold flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* TAB 1: BLOG ARTICLES */}
      {activeTab === "blogs" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setBlogPage(1);
                }}
                placeholder="Search articles by title or category..."
                className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Total {filteredBlogs.length} articles found
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-slate-500 space-y-3">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-medium">Loading articles...</p>
              </div>
            ) : paginatedBlogs.length > 0 ? (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        <th className="py-4 px-6">Article</th>
                        <th className="py-4 px-6">Category</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6">Date</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                      {paginatedBlogs.map((blog) => (
                        <tr key={blog.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-4">
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                                <Image
                                  src={blog.coverImage || "https://via.placeholder.com/150"}
                                  alt={blog.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0 max-w-xs sm:max-w-md">
                                <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1 text-sm">
                                  {blog.title}
                                </h4>
                                <p className="text-[11px] text-slate-400 line-clamp-1">/blog/{blog.slug}</p>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-6">
                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {blog.category}
                            </span>
                          </td>

                          <td className="py-4 px-6">
                            {blog.published ? (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 rounded-full border border-emerald-200 dark:border-emerald-800">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Published</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 rounded-full border border-amber-200 dark:border-amber-800">
                                <Clock className="w-3.5 h-3.5 text-amber-500" />
                                <span>Draft</span>
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-6 text-slate-500">
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </td>

                          <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                            <Link
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              className="p-2 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors inline-flex"
                              title="Preview"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>

                            <Link
                              href={`/admin/blog/edit/${blog.id}`}
                              className="p-2 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors inline-flex"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </Link>

                            <button
                              onClick={() => setDeleteId(blog.id)}
                              className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition-colors inline-flex"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Article Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-slate-500">
                    Showing {blogStartIndex + 1} to {Math.min(blogStartIndex + blogPageSize, totalBlogItems)} of {totalBlogItems} articles
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      disabled={validBlogPage <= 1}
                      onClick={() => setBlogPage((p) => Math.max(1, p - 1))}
                      className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    </button>
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      Page {validBlogPage} of {totalBlogPages}
                    </span>
                    <button
                      disabled={validBlogPage >= totalBlogPages}
                      onClick={() => setBlogPage((p) => Math.min(totalBlogPages, p + 1))}
                      className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center space-y-3">
                <FileText className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No blog posts found</h3>
                <p className="text-xs text-slate-500">Click "Create New Article" to write your first article.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CLIENT CONSULTANCY ENQUIRIES */}
      {activeTab === "enquiries" && (
        <div className="animate-fade-in">
          <ConsultancyAdminViewer />
        </div>
      )}

      {/* TAB 3: ADVERTISEMENTS */}
      {activeTab === "ads" && (
        <div className="animate-fade-in max-w-4xl">
          <AdManager />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 space-y-6 shadow-2xl">
            <div className="flex items-center space-x-3 text-red-600">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold">Delete Blog Post?</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Are you sure you want to permanently delete this blog post? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/30"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
