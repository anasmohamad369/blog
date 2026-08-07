"use client";

import { useEffect, useState } from "react";
import AdminLoginForm from "@/components/AdminLoginForm";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import Link from "next/link";
import { Zap, KeyRound, LogOut, ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/verify");
      if (res.ok) {
        const data = await res.json();
        setAuthenticated(data.authenticated === true);
      } else {
        setAuthenticated(false);
      }
    } catch (err) {
      console.error("Auth check error:", err);
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setAuthenticated(false);
    }
  };

  if (authenticated === null) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center space-x-3 text-slate-500">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
        <span className="text-sm font-medium">Verifying Admin Permissions...</span>
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLoginForm onSuccess={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Admin Dedicated Navigation Bar */}
      <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white block">
              Admin Portal
            </span>
            <span className="text-[10px] text-emerald-400 font-bold block -mt-0.5 uppercase tracking-wider flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 inline mr-1" /> Authenticated
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <ThemeToggle />

          <button
            onClick={() => setShowPasswordModal(true)}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-full border border-slate-700 transition-colors"
            title="Change Admin Password"
          >
            <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Change Password</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-red-300 hover:text-white bg-red-950/60 hover:bg-red-900 px-3.5 py-2 rounded-full border border-red-800/80 transition-colors"
            title="Log Out of Admin Portal"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-full border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Website</span>
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
}
