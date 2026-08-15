"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled app error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-red-100 dark:bg-red-950 flex items-center justify-center text-red-600 dark:text-red-400">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Something went wrong!</h1>
      <p className="text-base text-slate-600 dark:text-slate-400 max-w-md">
        An unexpected error occurred while processing your request.
      </p>
      {error?.message && (
        <p className="text-xs font-mono text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-800 max-w-md">
          {error.message}
        </p>
      )}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
