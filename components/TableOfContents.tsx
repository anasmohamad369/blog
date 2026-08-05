"use client";

import { List, ChevronRight } from "lucide-react";

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  // Extract all lines starting with ### or ####
  const lines = content.split("\n");
  const headings = lines
    .filter((line) => line.trim().startsWith("### ") || line.trim().startsWith("#### "))
    .map((line, index) => {
      const isSub = line.trim().startsWith("#### ");
      const text = line.replace(/^(###|####)\s*/, "").trim();
      return { id: `heading-${index}`, text, isSub };
    });

  if (headings.length === 0) return null;

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200/80 dark:border-slate-800 my-8">
      <div className="flex items-center space-x-2 font-bold text-slate-900 dark:text-white text-sm mb-4">
        <List className="w-4 h-4 text-emerald-500" />
        <span>Table of Contents</span>
      </div>

      <nav className="space-y-2">
        {headings.map((h, i) => (
          <a
            key={i}
            href={`#${h.id}`}
            className={`flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${
              h.isSub ? "pl-4 text-[11px]" : "font-semibold"
            }`}
          >
            <ChevronRight className="w-3 h-3 text-emerald-500 flex-shrink-0" />
            <span className="line-clamp-1">{h.text}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
