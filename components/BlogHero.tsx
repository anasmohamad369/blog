interface BlogHeroProps {
  title?: string;
  subtitle?: string;
  categoryBadge?: string;
}

export default function BlogHero({
  title = "Insights, Guides & Industry Knowledge",
  subtitle = "Explore expert articles, practical tips, installation guides, and the latest innovations in earthing and electrical safety to help you make informed decisions.",
  categoryBadge,
}: BlogHeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        {categoryBadge && (
          <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 rounded-full shadow-inner">
            {categoryBadge}
          </span>
        )}

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          {title}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
