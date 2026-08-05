import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Zap, Layers, ExternalLink } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import ConsultancyForm from "@/components/ConsultancyForm";
import { getLatestBlogs } from "@/lib/blogs";
import { getHeroAd } from "@/lib/ads";

// Revalidate page data automatically every 5 minutes (300 seconds)
export const revalidate = 300;

export default async function HomePage() {
  const [latestBlogs, heroAd] = await Promise.all([
    getLatestBlogs(3),
    getHeroAd(),
  ]);

  const adImage = heroAd.imageUrl || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="space-y-16 md:space-y-24 pb-20 bg-white dark:bg-slate-950">
      {/* 1. Hero Section - Clean Light UI with Text on Left & Advertisement Placement on Right */}
      <section className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Side: Clean Text & Actions with Scroll Entrance */}
            <div className="lg:col-span-7 space-y-6 text-left animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Industrial Grounding & Safety Experts</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Build Safer Electrical Systems With <span className="text-emerald-600 dark:text-emerald-400">Certified Earthing</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
                Discover comprehensive technical guides, industry standards, installation best practices, and expert advice on electrical grounding and lightning protection.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/blog"
                  className="px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <span>Explore Latest Articles</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#about"
                  className="px-7 py-3.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all"
                >
                  <span>Learn About Earthing</span>
                </Link>
              </div>
            </div>

            {/* Right Side: Advertisement Placement */}
            <div className="lg:col-span-5 w-full animate-fade-in-up" style={{ animationDelay: "150ms" }}>
              <div className="relative group rounded-3xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 p-2 shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                  <span>Sponsored Ad</span>
                </div>

                <a
                  href={heroAd.linkUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden group-hover:opacity-95 transition-opacity"
                >
                  <img
                    src={adImage}
                    alt={heroAd.title || "Advertisement"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-5">
                    <div className="flex items-center justify-between w-full text-white">
                      <span className="text-xs sm:text-sm font-bold line-clamp-1">
                        {heroAd.title || "Featured Sponsor Announcement"}
                      </span>
                      <ExternalLink className="w-4 h-4 text-emerald-400 ml-2 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. About Earthing Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <Image
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop"
                  alt="Earthing Installation & Equipment"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      100% Compliant with IEEE 81 & IS 3043 Grounding Standards
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <Layers className="w-4 h-4" />
                <span>Electrical Safety Essentials</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                What is Earthing?
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                <p>
                  Earthing, also known as grounding, is the process of connecting electrical equipment safely to the earth. It provides a direct path for unwanted electrical current, protecting people and devices from electric shocks and equipment damage.
                </p>
                <p>
                  A proper earthing system improves electrical safety, reduces the risk of fire caused by leakage currents, and protects expensive equipment from voltage surges and lightning strikes. It is an essential part of every residential, commercial, and industrial electrical installation.
                </p>
                <p>
                  At Earthing Solutions, we provide reliable grounding products, expert installation services, and technical guidance to help you build safer and more efficient electrical systems that comply with industry standards.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/blog?category=Installation+%26+Safety"
                  className="inline-flex items-center space-x-2 text-base font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Latest Blogs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Knowledge Hub
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Latest Articles
            </h2>
          
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-md"
          >
            <span>View All Blogs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>

      {/* 4. Talk to an Expert / Consultancy Form Section */}
      <section id="consultancy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <ConsultancyForm />
      </section>
    </div>
  );
}
