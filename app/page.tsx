import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Zap, Layers, CheckCircle } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import { getLatestBlogs } from "@/lib/blogs";

export default async function HomePage() {
  const latestBlogs = await getLatestBlogs(3);

  return (
    <div className="space-y-16 md:space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-20 pb-24 md:pt-28 md:pb-32 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-bold uppercase tracking-wider shadow-lg">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Industrial Grounding & Safety Experts</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Build Safer Electrical Systems With <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Certified Earthing</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Discover comprehensive technical guides, industry standards, installation best practices, and expert advice on electrical grounding and lightning protection.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/blog"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <span>Explore Latest Articles</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#about"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-base transition-all flex items-center justify-center space-x-2"
            >
              <span>Learn About Earthing</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. About Earthing Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                <Image
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop"
                  alt="Earthing Installation & Equipment"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl border border-white/20">
                  <div className="flex items-center space-x-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      100% Compliant with IEEE 81 & IS 3043 Grounding Standards
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3.5 py-1.5 rounded-full">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Knowledge Hub
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Latest Articles
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Stay updated with practical knowledge, expert advice, and the latest trends in electrical grounding and safety.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-slate-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white font-bold text-sm transition-all shadow-md"
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
    </div>
  );
}
