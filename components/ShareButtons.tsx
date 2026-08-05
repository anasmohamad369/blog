"use client";

import { useState } from "react";
import { Share2, Link2, Check } from "lucide-react";

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareUrls = {
    twitter: typeof window !== "undefined" ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}` : "#",
    linkedin: typeof window !== "undefined" ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` : "#",
    facebook: typeof window !== "undefined" ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` : "#",
  };

  return (
    <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400">
      <span className="flex items-center text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 space-x-1.5 mr-1">
        <Share2 className="w-3.5 h-3.5" />
        <span>Share:</span>
      </span>

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 transition-colors relative group"
        title="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Link2 className="w-4 h-4" />}
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-slate-900 text-white text-[10px] rounded font-medium shadow-md">
            Copied!
          </span>
        )}
      </button>

      {/* Twitter / X */}
      <a
        href={shareUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 transition-colors text-xs font-bold"
        title="Share on X (Twitter)"
      >
        𝕏
      </a>

      {/* LinkedIn */}
      <a
        href={shareUrls.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 transition-colors text-xs font-bold"
        title="Share on LinkedIn"
      >
        in
      </a>

      {/* Facebook */}
      <a
        href={shareUrls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 transition-colors text-xs font-bold"
        title="Share on Facebook"
      >
        fb
      </a>
    </div>
  );
}
