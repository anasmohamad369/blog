"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: "video" | "banner";
  description?: string;
}

export default function ImageUploader({
  label,
  value,
  onChange,
  aspectRatio = "video",
  description,
}: ImageUploaderProps) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setLoading(true);
    setStatusMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/uploads/image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Upload failed");
      }

      const data = await res.json();
      const returnedUrl = data.url;

      if (!returnedUrl) {
        throw new Error("No image URL returned from server");
      }

      onChange(returnedUrl);
      setPreview(returnedUrl);
      setStatusMessage({ text: "Image uploaded successfully!", type: "success" });
    } catch (err: any) {
      console.error("Upload error:", err);
      setStatusMessage({ text: "Image upload failed. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    setStatusMessage(null);
  };

  return (
    <div className="w-full space-y-2">
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
        {description && (
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
            {description}
          </p>
        )}
      </div>

      {preview ? (
        <div className="relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 flex items-center justify-center p-2">
          <div className="relative w-full max-h-56 min-h-[140px] flex items-center justify-center">
            {/* Standard img or Next.js Image for local and remote URLs */}
            <img
              src={preview}
              alt={label}
              className="w-full h-auto max-h-52 object-contain rounded-xl"
            />
            {loading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-2 rounded-xl">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
                <span className="text-sm font-medium">Uploading image...</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleRemove}
            disabled={loading}
            className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-red-600 text-white rounded-full transition-all shadow-lg backdrop-blur-md opacity-90 group-hover:opacity-100"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl cursor-pointer bg-slate-50 dark:bg-slate-900/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            {loading ? (
              <Loader2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 animate-spin mb-3" />
            ) : (
              <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 mb-3 transition-colors" />
            )}
            <p className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, WEBP, GIF up to 10MB</p>
            {description && (
              <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                {description}
              </p>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={loading}
          />
        </label>
      )}

      {statusMessage && (
        <div
          className={`flex items-center space-x-2 text-xs font-medium px-3 py-2 rounded-lg ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
              : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-800"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-500" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}
    </div>
  );
}
