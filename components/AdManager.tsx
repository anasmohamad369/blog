"useClient";
"use client";

import { useState, useEffect } from "react";
import ImageUploader from "@/components/ImageUploader";
import { ExternalLink, Save, CheckCircle2, AlertCircle, Loader2, Megaphone } from "lucide-react";

export default function AdManager() {
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    async function fetchAd() {
      try {
        const res = await fetch("/api/ads");
        if (res.ok) {
          const data = await res.json();
          setImageUrl(data.imageUrl || "");
          setLinkUrl(data.linkUrl || "");
          setTitle(data.title || "");
        }
      } catch (err) {
        console.error("Failed to load ad configuration:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAd();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      setMessage({ text: "Please upload an advertisement banner image.", type: "error" });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl,
          linkUrl: linkUrl.trim() || "#",
          title: title.trim() || "Featured Advertisement",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save advertisement");
      }

      setMessage({ text: "Advertisement banner and hyperlink updated successfully!", type: "success" });
    } catch (err: any) {
      console.error("Save ad error:", err);
      setMessage({ text: err.message || "Failed to update advertisement.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-center space-x-3 py-12">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
        <span className="text-sm font-medium text-slate-500">Loading Advertisement Config...</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl">
          <Megaphone className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Global Advertisement Banner
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Upload the banner image, ad title, and target link URL to display dynamically on the home page hero section and blog pages.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner Image Uploader */}
          <div>
            <ImageUploader
              label="Advertisement Image Banner"
              value={imageUrl}
              onChange={(url) => setImageUrl(url)}
              aspectRatio="banner"
              description="Recommended dimensions: 1200 x 630 px (or 16:9 ratio)"
            />
          </div>

          {/* Hyperlink & Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Ad Title / Campaign Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Special Offer on Chemical Earthing Rods"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Hyperlink URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://example.com/product-landing-page"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <ExternalLink className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Clicking the advertisement banner on the home page hero section or blog pages will open this link in a new tab.
              </p>
            </div>

            {message && (
              <div
                className={`flex items-center space-x-2 text-xs font-medium px-4 py-3 rounded-xl ${
                  message.type === "success"
                    ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    : "bg-red-50 text-red-800 dark:bg-red-950/50 dark:text-red-300 border border-red-200 dark:border-red-800"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Banner...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Advertisement Banner & Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
