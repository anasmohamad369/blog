import Link from "next/link";
import Image from "next/image";
import { User, Tag, ShieldAlert, ArrowRight, ExternalLink, Megaphone } from "lucide-react";
import { Blog } from "@/lib/types";
import { AdConfig } from "@/lib/ads";

interface BlogSidebarProps {
  blog: Blog;
  heroAd?: AdConfig;
}

export default function BlogSidebar({ blog, heroAd }: BlogSidebarProps) {
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

      {/* Featured Sponsored Advertisement Box */}
      {heroAd && (
        <div className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md space-y-4 group">
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
            <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
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
      )}

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
          href="/#consultancy"
          className="inline-flex items-center justify-center w-full py-3 px-4 bg-white text-emerald-950 font-bold text-xs rounded-xl shadow hover:bg-emerald-50 transition-colors space-x-2"
        >
          <span>Request Consultation</span>
          <ArrowRight className="w-4 h-4 text-emerald-700" />
        </Link>
      </div>
    </aside>
  );
}
