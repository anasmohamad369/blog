import Link from "next/link";
import Image from "next/image";
import { User, Tag, Mail, ShieldAlert, ArrowRight } from "lucide-react";
import { Blog } from "@/lib/types";

interface BlogSidebarProps {
  blog: Blog;
}

export default function BlogSidebar({ blog }: BlogSidebarProps) {
  return (
    <aside className="space-y-8 lg:sticky lg:top-24">
      {/* Author Card */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center border-2 border-emerald-500">
            <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Earthing Solutions Team</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Electrical Grounding Experts</p>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Providing industry-certified guidance, grounding products, and technical testing for electrical safety compliance.
        </p>
      </div>

      {/* Article Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-sm">
            <Tag className="w-4 h-4 text-emerald-500" />
            <span>Article Tags</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quick Consultation Box */}
      <div className="p-6 bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-3xl shadow-lg space-y-4">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-emerald-300" />
          <h4 className="font-bold text-base">Need Technical Guidance?</h4>
        </div>
        <p className="text-xs text-emerald-100 leading-relaxed">
          Get expert recommendations on earth electrode sizing, soil resistivity calculations, and lightning protection.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center w-full py-3 px-4 bg-white text-emerald-950 font-bold text-xs rounded-xl shadow hover:bg-emerald-50 transition-colors space-x-2"
        >
          <span>Request Consultation</span>
          <ArrowRight className="w-4 h-4 text-emerald-700" />
        </Link>
      </div>
    </aside>
  );
}
