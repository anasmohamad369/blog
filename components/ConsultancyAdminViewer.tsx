"use client";

import { useEffect, useState } from "react";
import { ConsultancyRequest } from "@/lib/consultancy";
import { Mail, Phone, Calendar, User, MessageSquare, Headset, RefreshCw } from "lucide-react";

export default function ConsultancyAdminViewer() {
  const [requests, setRequests] = useState<ConsultancyRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/consultancy");
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
      }
    } catch (err) {
      console.error("Error fetching consultancy requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl">
            <Headset className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Consultancy & Expert Enquiries
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              View incoming consultation requests submitted by clients and site engineers.
            </p>
          </div>
        </div>

        <button
          onClick={fetchRequests}
          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          title="Refresh List"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-500 text-sm">
          Loading consultancy enquiries...
        </div>
      ) : requests.length > 0 ? (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {req.name}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                    {req.category}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(req.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-300">
                <a
                  href={`mailto:${req.email}`}
                  className="flex items-center space-x-1.5 hover:text-emerald-600 font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{req.email}</span>
                </a>
                {req.phone && (
                  <a
                    href={`tel:${req.phone}`}
                    className="flex items-center space-x-1.5 hover:text-emerald-600 font-medium"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{req.phone}</span>
                  </a>
                )}
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 leading-relaxed">
                <div className="flex items-start space-x-2">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <p>{req.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-slate-500 text-xs space-y-2">
          <p className="font-semibold text-slate-700 dark:text-slate-300">No consultation requests submitted yet.</p>
          <p>When users submit the "Talk to an Expert" form, their enquiries will appear here.</p>
        </div>
      )}
    </div>
  );
}
