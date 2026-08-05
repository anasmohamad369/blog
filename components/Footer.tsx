import Link from "next/link";
import { Zap, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Earthing<span className="text-emerald-400">Solutions</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Leading provider of industrial grounding equipment, chemical earthing compounds, and lightning protection systems compliant with IEEE and IS standards.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-emerald-400 transition-colors">About Earthing</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-400 transition-colors">Latest Articles & Guides</Link>
              </li>
              <li>
                <Link href="/admin/blog" className="hover:text-emerald-400 transition-colors">Admin Portal</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Article Topics</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/blog?category=Installation+%26+Safety" className="hover:text-emerald-400 transition-colors">Installation & Safety</Link>
              </li>
              <li>
                <Link href="/blog?category=Equipment+%26+Tech" className="hover:text-emerald-400 transition-colors">Equipment & Tech</Link>
              </li>
              <li>
                <Link href="/blog?category=Standards+%26+Compliance" className="hover:text-emerald-400 transition-colors">Standards & Compliance</Link>
              </li>
              <li>
                <Link href="/blog?category=Maintenance+%26+Testing" className="hover:text-emerald-400 transition-colors">Maintenance & Testing</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Get In Touch</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>support@earthingsolutions.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+1 (800) 555-EARTH</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Industrial Safety Complex, Sector 4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Earthing Solutions Inc. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Built with Next.js 15 App Router, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
