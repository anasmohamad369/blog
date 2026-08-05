"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Hide public footer on Admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
     

        {/* Bottom copyright */}
        <div className=" border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Earthing Solutions Inc. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Built with Next.js 15 App Router, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
