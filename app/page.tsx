import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Megaphone,
  ExternalLink,
  ChevronRight,
  Building,
  Link2,
  Compass,
  Package,
  Wrench,
  Activity,
  BookOpen,
} from "lucide-react";
import BlogCard from "@/components/BlogCard";
import ConsultancyForm from "@/components/ConsultancyForm";
import { getLatestBlogs } from "@/lib/blogs";
import { getHeroAd } from "@/lib/ads";

// Revalidate page data automatically every 5 minutes (300 seconds)
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Structural Earthing: Foundation, Design, Lightning Protection & Standards",
  description:
    "Learn structural earthing, foundation earthing, bonding, lightning protection, design, installation, testing, products, standards and compliance with practical engineering guidance",
};

const earthingTopics = [
  {
    step: "01",
    name: "Foundation Earthing",
    href: "#",
    icon: Building,
    desc: "Concrete-encased electrodes (Ufer ground) & rebar integration.",
  },
  {
    step: "02",
    name: "Structural Bonding",
    href: "#",
    icon: Link2,
    desc: "Equipotential bonding across steel frameworks & metallic columns.",
  },
  {
    step: "03",
    name: "Earthing Design",
    href: "#",
    icon: Compass,
    desc: "Soil resistivity modeling, grid layout & touch/step voltage safety.",
  },
  {
    step: "04",
    name: "Products",
    href: "#",
    icon: Package,
    desc: "Conductors, exothermic welds, earth pits, copper tape & clamps.",
  },
  {
    step: "05",
    name: "Installation",
    href: "#",
    icon: Wrench,
    desc: "Field practices, routing, connection methods & site compliance.",
  },
  {
    step: "06",
    name: "Testing",
    href: "#",
    icon: Activity,
    desc: "Fall-of-potential test (IEEE 81), resistance & continuity checks.",
  },
  {
    step: "07",
    name: "Lightning Protection",
    href: "#",
    icon: Zap,
    desc: "Structural LPS, air terminals, down conductors & surge protection.",
  },
  {
    step: "08",
    name: "Standards",
    href: "#",
    icon: BookOpen,
    desc: "IEEE 81, IS 3043, IEC 62305, BS 7430 & safety code compliance.",
  },
];

export default async function HomePage() {
  const [latestBlogs, heroAd] = await Promise.all([
    getLatestBlogs(3),
    getHeroAd(),
  ]);

  return (
    <div className="space-y-16 md:space-y-24 pb-20 bg-white dark:bg-slate-950">
      {/* 1. Hero Section - Clean Light UI with Text on Left & Dynamic Advertisement Placement on Right */}
      <section className="bg-slate-50/70 dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Side: Clean Text & Actions with Scroll Entrance */}
            <div className="lg:col-span-7 space-y-6 text-left animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Industrial Grounding & Safety Experts</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                Structural Earthing
                <span className="text-emerald-600 dark:text-emerald-400"> Knowledge Hub!</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
                A practical engineering resource covering structural earthing, foundation earthing, grounding, equipotential bonding, lightning protection, earthing design, testing, standards and installation practices.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="#about"
                  className="px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <span>Explore Structural Earthing</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/blog"
                  className="px-7 py-3.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm transition-all"
                >
                  <span>Browse Standards</span>
                </Link>
              </div>
            </div>

            {/* Right Side: Dynamic Advertisement Placement */}
            <div className="lg:col-span-5 w-full animate-fade-in-up" style={{ animationDelay: "150ms" }}>
              <div className="relative group rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <Megaphone className="w-4 h-4 text-emerald-500" />
                    <span>Sponsored Ad</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Featured</span>
                </div>

                {heroAd.linkUrl && heroAd.linkUrl.trim() !== "" && heroAd.linkUrl !== "#" ? (
                  <a
                    href={heroAd.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block space-y-3"
                  >
                    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-1">
                      <img
                        src={heroAd.imageUrl || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop"}
                        alt={heroAd.title || "Featured Sponsor"}
                        className="w-full h-auto max-h-80 object-contain rounded-xl group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>
                    {heroAd.title && (
                      <div className="flex items-center justify-between text-slate-900 dark:text-white font-bold text-xs">
                        <span className="line-clamp-2">{heroAd.title}</span>
                        <ExternalLink className="w-4 h-4 text-emerald-500 ml-2 flex-shrink-0" />
                      </div>
                    )}
                  </a>
                ) : (
                  <div className="space-y-3">
                    <div className="relative w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-1">
                      <img
                        src={heroAd.imageUrl || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop"}
                        alt={heroAd.title || "Featured Sponsor"}
                        className="w-full h-auto max-h-80 object-contain rounded-xl"
                      />
                    </div>
                    {heroAd.title && (
                      <div className="text-slate-900 dark:text-white font-bold text-xs">
                        <span>{heroAd.title}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. About Earthing Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <Image
                  src="/learn.png"
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
                <span>Structural Earthing</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                What is Structural Earthing?
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                <p>
                  Structural earthing is an important part of modern electrical safety, building infrastructure and lightning protection. It involves the planned integration of earthing and bonding arrangements with a building or structure to provide a controlled path for fault currents, lightning currents and unwanted electrical potential differences.
                </p>
                <p>
                  However, structural earthing is more than simply installing an earth electrode or connecting a conductor to reinforcement steel. A reliable system requires consideration of the building structure, foundation, reinforcement, soil conditions, electrical installation, lightning protection system, bonding requirements, applicable standards and installation practices.
                </p>
                <p>
                  StructuralEarthing.com is being developed as a dedicated knowledge platform for understanding these engineering principles in a practical and technically responsible manner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Standalone Separate UI Section: Engineering Knowledge Lifecycle & UI Boxes */}
      <section id="lifecycle-topics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="bg-slate-50/70 dark:bg-slate-900/60 rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-800">
              <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Engineering Lifecycle</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              From Foundation to Finished Structure
            </h3>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              We bring together information covering the complete structural earthing lifecycle:
            </p>
          </div>

          {/* Connected Process Flow Grid with Perfectly Centered Inter-Box Arrow Connectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative pt-2">
            {earthingTopics.map((topic, index) => {
              const Icon = topic.icon;
              const isLastInRow = (index + 1) % 4 === 0;
              return (
                <div key={topic.name} className="relative flex items-center">
                  {/* Card Box */}
                  <a
                    href="#"
                    className="w-full group flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/80 hover:-translate-y-1 transition-all duration-300 relative z-10"
                  >
                    <div className="space-y-4">
                      {/* Top Row: Icon + Step Number Badge */}
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-all duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-200/80 dark:border-emerald-800">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors pt-1">
                        {topic.name}
                      </h4>
                    </div>

                    {/* Action Link Footer */}
                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </a>

                  {/* Responsive Flow Connectors for All Screen Sizes */}
                  {index < earthingTopics.length - 1 && (
                    <>
                      {/* 1. Desktop (4 cols): Horizontal connector for steps 1-3 & 5-7 */}
                      {!isLastInRow && (
                        <div className="hidden lg:flex absolute left-full w-8 top-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
                          <div className="w-full h-0.5 bg-emerald-400 dark:bg-emerald-600 absolute inset-0 my-auto" />
                          <div className="w-7 h-7 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white shadow-md border-2 border-white dark:border-slate-900 flex items-center justify-center relative z-10">
                            <ChevronRight className="w-4 h-4 stroke-[3]" />
                          </div>
                        </div>
                      )}



                      {/* 3. Tablet (2 cols): Horizontal connector for odd step items (01, 03, 05, 07) */}
                      {index % 2 === 0 && (
                        <div className="hidden sm:flex lg:hidden absolute left-full w-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
                          <div className="w-full h-0.5 bg-emerald-400 dark:bg-emerald-600 absolute inset-0 my-auto" />
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white shadow flex items-center justify-center border-2 border-white dark:border-slate-900 relative z-10">
                            <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        </div>
                      )}

                      {/* 4. Tablet (2 cols): Downward connector for even step items (02, 04, 06) */}
                      {index % 2 === 1 && (
                        <div className="hidden sm:flex lg:hidden absolute -bottom-7 left-1/2 -translate-x-1/2 z-20 items-center justify-center pointer-events-none">
                          <div className="w-0.5 h-6 bg-emerald-400 dark:bg-emerald-600 absolute inset-0 mx-auto" />
                          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white shadow flex items-center justify-center border-2 border-white dark:border-slate-900 relative z-10">
                            <ChevronRight className="w-3.5 h-3.5 stroke-[3] rotate-90" />
                          </div>
                        </div>
                      )}

                      {/* 5. Mobile (1 col): Vertical downward connector between all stacked cards */}
                      <div className="flex sm:hidden absolute -bottom-7 left-1/2 -translate-x-1/2 z-20 items-center justify-center pointer-events-none">
                        <div className="w-0.5 h-6 bg-emerald-400 dark:bg-emerald-600 absolute inset-0 mx-auto" />
                        <div className="w-6 h-6 rounded-full bg-emerald-600 text-white shadow flex items-center justify-center border-2 border-white dark:border-slate-900 relative z-10">
                          <ChevronRight className="w-3.5 h-3.5 stroke-[3] rotate-90" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Goal Statement */}
          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal text-center max-w-3xl mx-auto">
              Our goal is to provide clear, technically grounded information that helps you understand earthing systems and make better engineering decisions.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Latest Blogs Section */}
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

      {/* 5. Talk to an Expert / Consultancy Form Section */}
      <section id="consultancy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <ConsultancyForm />
      </section>
    </div>
  );
}
