"use client";

import { useEffect, useState } from "react";
import { ConsultancyRequest, EnquiryStatus } from "@/lib/consultancy";
import {
  Mail,
  Phone,
  Calendar,
  User,
  MessageSquare,
  Headset,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Trash2,
  PhoneCall,
  ExternalLink,
  Check,
  Tag,
  Inbox,
  Eye,
  X
} from "lucide-react";

export default function ConsultancyAdminViewer() {
  const [requests, setRequests] = useState<ConsultancyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Selected Detail Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState<ConsultancyRequest | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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

  // Update Status
  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/consultancy", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry((prev) => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete Enquiry
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/consultancy?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setRequests((prev) => prev.filter((r) => r.id !== id));
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete enquiry:", err);
    } finally {
      setDeletingId(null);
    }
  };

  // Filtering Logic
  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.name.toLowerCase().includes(search.toLowerCase()) ||
      req.email.toLowerCase().includes(search.toLowerCase()) ||
      (req.phone && req.phone.toLowerCase().includes(search.toLowerCase())) ||
      req.message.toLowerCase().includes(search.toLowerCase()) ||
      (req.category && req.category.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" || req.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalItems = filteredRequests.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * pageSize;
  const paginatedRequests = filteredRequests.slice(startIndex, startIndex + pageSize);

  // Statistics
  const newCount = requests.filter((r) => r.status === "new" || !r.status).length;
  const contactedCount = requests.filter((r) => r.status === "contacted").length;
  const resolvedCount = requests.filter((r) => r.status === "resolved").length;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-4">
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 shadow-sm">
            <Headset className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Consultancy & Client Enquiries
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Track, manage, update status, and respond to expert guidance requests from clients.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchRequests}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors text-xs font-bold shadow-sm"
            title="Refresh Enquiries"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-emerald-600" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Overview Statistics Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Enquiries</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{requests.length}</p>
        </div>
        <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 space-y-1">
          <span className="text-xs font-bold text-amber-800 dark:text-amber-300">New / Pending</span>
          <p className="text-2xl font-extrabold text-amber-700 dark:text-amber-400">{newCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 space-y-1">
          <span className="text-xs font-bold text-blue-800 dark:text-blue-300">In Contact</span>
          <p className="text-2xl font-extrabold text-blue-700 dark:text-blue-400">{contactedCount}</p>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 space-y-1">
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Resolved</span>
          <p className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">{resolvedCount}</p>
        </div>
      </div>

      {/* Filters & Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search name, email, message..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1" />
            Status:
          </span>
          {[
            { key: "all", label: "All" },
            { key: "new", label: "New" },
            { key: "contacted", label: "In Contact" },
            { key: "resolved", label: "Resolved" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setStatusFilter(tab.key);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === tab.key
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Enquiries Table */}
      {loading ? (
        <div className="py-16 text-center text-slate-500 space-y-3">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-medium">Loading client enquiries...</p>
        </div>
      ) : paginatedRequests.length > 0 ? (
        <div className="space-y-4">
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="py-3.5 px-5">Client Name & Contact</th>
                  <th className="py-3.5 px-5">Category</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5">Date Received</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
                {paginatedRequests.map((req) => {
                  const status = req.status || "new";
                  return (
                    <tr key={req.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      {/* Name & Contact */}
                      <td className="py-4 px-5">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="font-bold text-slate-900 dark:text-white text-sm">
                              {req.name}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-slate-500 dark:text-slate-400">
                            <a href={`mailto:${req.email}`} className="hover:text-emerald-600 flex items-center space-x-1">
                              <Mail className="w-3 h-3" />
                              <span>{req.email}</span>
                            </a>
                            {req.phone && (
                              <a href={`tel:${req.phone}`} className="hover:text-emerald-600 flex items-center space-x-1">
                                <Phone className="w-3 h-3" />
                                <span>{req.phone}</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-4 px-5">
                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
                          <Tag className="w-3 h-3 text-emerald-500 mr-1" />
                          {req.category}
                        </span>
                      </td>

                      {/* Interactive Status Selector Dropdown */}
                      <td className="py-4 px-5">
                        <select
                          value={status}
                          disabled={updatingId === req.id}
                          onChange={(e) => handleStatusChange(req.id, e.target.value as EnquiryStatus)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold border focus:outline-none transition-all cursor-pointer ${
                            status === "new"
                              ? "bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                              : status === "contacted"
                              ? "bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                              : "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                          }`}
                        >
                          <option value="new">🟡 New (Pending)</option>
                          <option value="contacted">🔵 In Contact</option>
                          <option value="resolved">🟢 Resolved</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-5 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setSelectedEnquiry(req)}
                            className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title="View Full Message"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingId(req.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Clean Pagination Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center space-x-2 text-slate-500">
              <span>Showing {startIndex + 1} to {Math.min(startIndex + pageSize, totalItems)} of {totalItems} enquiries</span>
              <span>•</span>
              <span>Show per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 font-semibold text-slate-700 dark:text-slate-300"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                disabled={validPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </button>

              <span className="px-3 py-1 font-bold text-slate-700 dark:text-slate-300">
                Page {validPage} of {totalPages}
              </span>

              <button
                disabled={validPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-16 text-center text-slate-500 space-y-3">
          <Inbox className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No enquiries found</h3>
          <p className="text-xs text-slate-500">
            {search || statusFilter !== "all"
              ? "No enquiries matched your search or status filter criteria."
              : "When clients submit consultation requests, they will appear here."}
          </p>
        </div>
      )}

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 space-y-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-xl">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{selectedEnquiry.name}</h3>
                  <span className="text-xs text-slate-400">{new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Email Address</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="block font-bold text-emerald-600 hover:underline truncate">
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Phone Number</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="block font-bold text-emerald-600 hover:underline truncate">
                    {selectedEnquiry.phone || "N/A"}
                  </a>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Requirement Category</span>
                <p className="font-bold text-slate-900 dark:text-white">{selectedEnquiry.category}</p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Message / Inquiry Details</span>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-normal whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </p>
              </div>

              {/* Status Action Selector in Modal */}
              <div className="flex items-center justify-between pt-2">
                <span className="font-semibold text-slate-500">Update Status:</span>
                <div className="flex items-center space-x-2">
                  {(["new", "contacted", "resolved"] as EnquiryStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                      className={`px-3 py-1.5 rounded-lg font-bold text-[11px] capitalize transition-all ${
                        selectedEnquiry.status === st
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 border-t border-slate-100 dark:border-slate-800 pt-4">
              <a
                href={`mailto:${selectedEnquiry.email}?subject=Regarding your Earthing Consultation Request`}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md flex items-center space-x-1.5"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 space-y-6 shadow-2xl">
            <div className="flex items-center space-x-3 text-red-600">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold">Delete Client Enquiry?</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Are you sure you want to delete this client enquiry? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setDeletingId(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/30"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
