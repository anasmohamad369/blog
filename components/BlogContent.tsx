"use client";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  // Simple markdown renderer for headers, bold text, lists, and blockquotes
  const renderParagraph = (text: string, index: number) => {
    const trimmed = text.trim();
    if (!trimmed) return null;

    // Headings
    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={index} id={`heading-${index}`} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4 tracking-tight">
          {trimmed.replace("### ", "")}
        </h3>
      );
    }
    if (trimmed.startsWith("#### ")) {
      return (
        <h4 key={index} className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-3">
          {trimmed.replace("#### ", "")}
        </h4>
      );
    }

    // Blockquotes
    if (trimmed.startsWith("> ")) {
      return (
        <blockquote key={index} className="my-6 pl-5 py-3 border-l-4 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-slate-700 dark:text-slate-300 rounded-r-xl italic text-base sm:text-lg">
          {trimmed.replace("> ", "")}
        </blockquote>
      );
    }

    // Bullet points
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const items = trimmed.split("\n").map(item => item.replace(/^[-*]\s*/, ""));
      return (
        <ul key={index} className="my-4 space-y-2 pl-6 list-disc marker:text-emerald-500 text-slate-700 dark:text-slate-300">
          {items.map((it, i) => (
            <li key={i} className="leading-relaxed">
              {formatInlineStyles(it)}
            </li>
          ))}
        </ul>
      );
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split("\n").map(item => item.replace(/^\d+\.\s*/, ""));
      return (
        <ol key={index} className="my-4 space-y-2 pl-6 list-decimal marker:text-emerald-500 text-slate-700 dark:text-slate-300">
          {items.map((it, i) => (
            <li key={i} className="leading-relaxed">
              {formatInlineStyles(it)}
            </li>
          ))}
        </ol>
      );
    }

    return (
      <p key={index} className="my-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
        {formatInlineStyles(trimmed)}
      </p>
    );
  };

  // Inline formatting helper for **bold** and `code`
  const formatInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-bold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="px-1.5 py-0.5 text-sm font-mono bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 rounded-md">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  const paragraphs = content.split("\n\n");

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      {paragraphs.map((p, i) => renderParagraph(p, i))}
    </div>
  );
}
