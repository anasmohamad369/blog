"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";

interface BlogBannerProps {
  bannerImage?: string;
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaUrl?: string;
}

export default function BlogBanner({
  bannerImage = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
  heading = "Need Professional Earthing Installation?",
  subheading = "Protect your residential, commercial, or industrial setup with certified grounding solutions and turn-key installation services.",
  ctaText = "Contact Our Experts",
  ctaUrl = "/#contact",
}: BlogBannerProps) {
  return (
    <div className="relative my-12 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 text-white">
      {/* Background Banner Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bannerImage}
          alt={heading}
          fill
          className="object-cover opacity-35 mix-blend-overlay scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
      </div>

      {/* Banner Content Container */}
      <div className="relative z-10 p-8 sm:p-12 lg:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Earthing & Safety Solutions</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
            {heading}
          </h3>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {subheading}
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link
            href={ctaUrl}
            className="inline-flex items-center space-x-2 px-7 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
