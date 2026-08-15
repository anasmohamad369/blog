"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Hide public footer on Admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bottom copyright & Admin Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Earthing Solutions Inc. All rights reserved.</p>
          
          <div className="flex items-center space-x-6">
           
            <Link
              href="/admin/blog"
              className="inline-flex items-center space-x-1 text-slate-400 dark:text-slate-600 hover:text-slate-700 dark:hover:text-slate-300 transition-colors py-1 px-2 rounded hover:bg-slate-100 dark:hover:bg-slate-900"
              title="Admin Portal Access"
            >
              <Lock className="w-3 h-3" />
              <span className="text-[11px] font-medium">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
