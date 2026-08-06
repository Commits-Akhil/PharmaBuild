"use client";

import { useEffect, useState } from "react";
import { RefreshCw, CheckCircle, XCircle, FileText, User, Mail, MapPin, Clock, Eye, AlertTriangle } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";
import api, { getImageUrl } from "../lib/api";
import { toast } from "../components/Toast";
import { SkeletonCard } from "../components/Skeleton";

export default function PharmacistDashboard() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showReason, setShowReason] = useState({});
  const [reason, setReason] = useState({});
  const [actionLoading, setActionLoading] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  async function fetchPrescriptions() {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/pharmacist/pending-prescriptions");
      const data =
        res.data.prescriptions ??
        res.data.data?.prescriptions ??
        [];
      setPrescriptions(data);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to load prescriptions.";
      setError(msg);
      toast(msg, "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  async function approvePrescription(prescriptionId) {
    setActionLoading((prev) => ({ ...prev, [prescriptionId]: true }));
    try {
      await api.post("/pharmacist/approve", { prescriptionId });
      setPrescriptions((prev) =>
        prev.filter((p) => p.prescription_id !== prescriptionId)
      );
      toast(`Prescription #${prescriptionId} approved successfully!`, "success");
    } catch (err) {
      const msg = err.response?.data?.message || "Approve failed.";
      toast(msg, "error");
    } finally {
      setActionLoading((prev) => ({ ...prev, [prescriptionId]: false }));
    }
  }

  async function rejectPrescription(prescriptionId) {
    const rejReason = reason[prescriptionId] || "Illegible prescription or invalid details";
    setActionLoading((prev) => ({ ...prev, [prescriptionId]: true }));
    try {
      await api.post("/pharmacist/reject", {
        prescriptionId,
        rejectionReason: rejReason,
      });
      setPrescriptions((prev) =>
        prev.filter((p) => p.prescription_id !== prescriptionId)
      );
      toast(`Prescription #${prescriptionId} rejected. Inventory released back to stock.`, "warning");
    } catch (err) {
      const msg = err.response?.data?.message || "Reject failed.";
      toast(msg, "error");
    } finally {
      setActionLoading((prev) => ({ ...prev, [prescriptionId]: false }));
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero / Header */}
          <section className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 md:p-10 mb-6 sm:mb-10 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2 sm:mb-3">
                Pharmacist Review Portal
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                Pending Prescriptions
              </h1>
              <p className="text-slate-600 mt-2 text-xs sm:text-base">
                Verify customer prescriptions to confirm order eligibility and dispatch.
              </p>
            </div>
            <button
              onClick={fetchPrescriptions}
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 transition text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh Queue
            </button>
          </section>

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Error Banner */}
          {error && !loading && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center text-rose-700 text-sm sm:text-base">
              <AlertTriangle className="mx-auto mb-2 text-rose-400" size={28} />
              <p className="font-semibold text-base sm:text-lg">{error}</p>
              <button
                onClick={fetchPrescriptions}
                className="mt-4 bg-rose-700 hover:bg-rose-800 text-white px-5 py-2 rounded-xl text-xs font-semibold"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty Queue */}
          {!loading && !error && prescriptions.length === 0 && (
            <div className="bg-white rounded-[24px] sm:rounded-[30px] p-10 sm:p-16 text-center border border-slate-200 shadow-sm">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 rounded-full border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-emerald-700" size={36} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Queue is All Clear!</h2>
              <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
                No pending customer prescriptions require verification right now.
              </p>
            </div>
          )}

          {/* Prescriptions Grid */}
          {!loading && !error && prescriptions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {prescriptions.map((presc) => (
                <div
                  key={presc.prescription_id}
                  className="bg-white rounded-[24px] sm:rounded-[28px] border border-slate-200 p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-300 transition shadow-sm"
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4 pb-4 border-b border-slate-200">
                      <div>
                        <span className="text-[10px] sm:text-xs text-slate-500 font-mono">ORDER #{presc.order_id}</span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                          Rx #{presc.prescription_id}
                        </h3>
                      </div>
                      <span className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-medium">
                        Pending
                      </span>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-2 text-xs sm:text-sm text-slate-600 mb-5">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-emerald-700 shrink-0" />
                        <span className="truncate">{presc.customer_name || "Customer"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-emerald-700 shrink-0" />
                        <span className="truncate">{presc.email || presc.customer_email || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-emerald-700 shrink-0" />
                        <span className="truncate">{presc.branch_name || "Branch"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-emerald-700 shrink-0" />
                        <span className="text-xs">{new Date(presc.uploaded_at).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Image Preview Thumbnail */}
                    <div className="relative group rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 mb-5 h-40 sm:h-48 flex items-center justify-center">
                      <img
                        src={getImageUrl(presc.image_url)}
                        alt="Prescription Document"
                        className="w-full h-full object-contain p-2"
                      />
                      <button
                        onClick={() => setSelectedImage(getImageUrl(presc.image_url))}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-medium text-xs sm:text-sm gap-2"
                      >
                        <Eye size={18} /> Inspect Full Screen
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    {!showReason[presc.prescription_id] ? (
                      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                        <button
                          onClick={() => approvePrescription(presc.prescription_id)}
                          disabled={actionLoading[presc.prescription_id]}
                          className="flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 transition text-white py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm disabled:opacity-50"
                        >
                          <CheckCircle size={15} />
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            setShowReason((prev) => ({
                              ...prev,
                              [presc.prescription_id]: true,
                            }))
                          }
                          disabled={actionLoading[presc.prescription_id]}
                          className="flex items-center justify-center gap-1.5 bg-red-600/20 hover:bg-red-600 border border-red-500/30 text-red-300 hover:text-white transition py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm disabled:opacity-50"
                        >
                          <XCircle size={15} />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2.5 bg-rose-50 p-3.5 sm:p-4 rounded-2xl border border-rose-200">
                        <label className="text-[11px] text-rose-700 font-medium block">
                          Reason for Rejection:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Signature missing or blurred"
                          value={reason[presc.prescription_id] || ""}
                          onChange={(e) =>
                            setReason((prev) => ({
                              ...prev,
                              [presc.prescription_id]: e.target.value,
                            }))
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs outline-none focus:border-rose-400"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => rejectPrescription(presc.prescription_id)}
                            disabled={actionLoading[presc.prescription_id]}
                            className="flex-1 bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-xl text-xs font-semibold disabled:opacity-50"
                          >
                            {actionLoading[presc.prescription_id] ? "Processing..." : "Confirm Rejection"}
                          </button>
                          <button
                            onClick={() =>
                              setShowReason((prev) => ({
                                ...prev,
                                [presc.prescription_id]: false,
                              }))
                            }
                            className="px-3 py-2 bg-gray-700 text-gray-300 hover:text-white rounded-xl text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Modal Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-3 sm:p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-slate-200 flex flex-col items-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-900 bg-slate-100 p-2 rounded-full z-10"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Prescription Full Screen"
              className="max-h-[80vh] w-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}


      <Footer />
    </>
  );
}
