export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
      {/* Hero Skeleton */}
      <div className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse w-full" />

      {/* Grid Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-96 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
