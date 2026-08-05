"use client";

import Link from "next/link";
import { useState } from "react";
import { Zap, BookOpen, ShieldCheck, Settings, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white block">
              Earthing<span className="text-emerald-600 dark:text-emerald-400">Solutions</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block -mt-1">
              Safety & Grounding
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
          <Link
            href="/"
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            About Earthing
          </Link>
          <Link
            href="/blog"
            className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>Blog</span>
          </Link>
          <Link
            href="/admin/blog"
            className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors bg-slate-100 dark:bg-slate-900 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800"
          >
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs">Admin Portal</span>
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/blog"
            className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/20 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Explore Articles
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-4">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 dark:text-slate-200"
          >
            Home
          </Link>
          <Link
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-800 dark:text-slate-200"
          >
            About Earthing
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-emerald-600 dark:text-emerald-400"
          >
            Blog Articles
          </Link>
          <Link
            href="/admin/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-semibold text-slate-600 dark:text-slate-400"
          >
            Admin Management
          </Link>
        </div>
      )}
    </header>
  );
}
