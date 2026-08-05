import Link from "next/link";
import { Zap, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
        <Zap className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">404 - Page Not Found</h1>
      <p className="text-base text-slate-600 dark:text-slate-400 max-w-md">
        The article or page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/blog"
        className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Blog Articles</span>
      </Link>
    </div>
  );
}
