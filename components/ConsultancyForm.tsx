"use client";

import { useState } from "react";
import { Mail, User, Phone, MessageSquare, Send, CheckCircle2, AlertCircle, Loader2, Headset, ShieldCheck, Check } from "lucide-react";

export default function ConsultancyForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Chemical Earthing Systems",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ text: "Please fill in all required fields (Name, Email, Message).", type: "error" });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/consultancy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit request.");
      }

      setStatus({ text: data.message || "Consultation request sent successfully!", type: "success" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "Chemical Earthing Systems",
        message: "",
      });
    } catch (err: any) {
      setStatus({ text: err.message || "Failed to send request. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50/70 dark:bg-slate-900/60 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Side: Professional Headline & Trust Bullet Points */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Headset className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Expert Consultation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Talk to an <span className="text-emerald-600 dark:text-emerald-400">Earthing Expert</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Need guidance on soil resistivity, earth pit design, or IEEE 81 grounding standards? Our certified electrical engineers are ready to assist you.
          </p>

          <div className="space-y-3 pt-2">
            {[
              "IEEE 81 & IS 3043 Grounding Compliance",
              "Custom Chemical Earthing & Soil Analysis",
              "24-Hour Technical Engineer Response",
            ].map((point, index) => (
              <div key={index} className="flex items-center space-x-3 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Direct engineer assistance • Zero obligation enquiry</span>
          </div>
        </div>

        {/* Right Side: Clean Professional Form Container */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Consultancy Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  >
                    <option value="Chemical Earthing Systems">Chemical Earthing Systems</option>
                    <option value="Lightning Protection & ESE">Lightning Protection & ESE</option>
                    <option value="Substation Ground Grid Design">Substation Ground Grid Design</option>
                    <option value="Earth Resistance Testing">Earth Resistance Testing</option>
                    <option value="General Safety Consultation">General Safety Consultation</option>
                  </select>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Project Details & Requirements *
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    placeholder="Describe your site conditions, earth resistance targets, or technical questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {status && (
                <div
                  className={`flex items-center space-x-2 text-xs font-medium px-4 py-3 rounded-xl ${
                    status.type === "success"
                      ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      : "bg-red-50 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-800"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  )}
                  <span>{status.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Consultation Request</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
