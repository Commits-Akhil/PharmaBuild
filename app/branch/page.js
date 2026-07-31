"use client";

import { useState, useEffect } from "react";
import {
  RefreshCw,
  CheckCircle,
  XCircle,
  User,
  Mail,
  MapPin,
  Clock,
  Eye,
  AlertTriangle,
} from "lucide-react";

import Header from "../components/header";
import Footer from "../components/footer";
import api, { getImageUrl } from "../lib/api";
import { toast } from "../components/Toast";
import { SkeletonCard } from "../components/Skeleton";

export default function PharmacistDashboard() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const [rejectId, setRejectId] = useState(null);
  const [reason, setReason] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  async function fetchPrescriptions() {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/pharmacist/pending-prescriptions");
      setPrescriptions(res.data.prescriptions || []);
    } catch (err) {
      const msg =
        err.response?.data?.message || "Failed to load prescriptions";
      setError(msg);
      toast(msg, "error");
    } finally {
      setLoading(false);
    }
  }

  function removePrescription(id) {
    setPrescriptions((prev) =>
      prev.filter((p) => p.prescription_id !== id)
    );
  }

  async function updatePrescription(id, action) {
    try {
      setLoadingId(id);

      const body = { prescriptionId: id };

      if (action === "reject") {
        body.rejectionReason =
          reason || "Illegible prescription or invalid details";
      }

      await api.post(`/pharmacist/${action}`, body);

      removePrescription(id);

      toast(
        action === "approve"
          ? "Prescription approved!"
          : "Prescription rejected!",
        action === "approve" ? "success" : "warning"
      );

      setRejectId(null);
      setReason("");
    } catch (err) {
      toast(
        err.response?.data?.message || `${action} failed`,
        "error"
      );
    } finally {
      setLoadingId(null);
    }
  }
    return (
    <>
      <Header />

      <div className="min-h-screen bg-[#0B1220] px-6 py-8">
        <div className="max-w-7xl mx-auto">

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white">
                Pending Prescriptions
              </h1>
              <p className="text-gray-400 mt-2">
                Review and approve customer prescriptions.
              </p>
            </div>

            <button
              onClick={fetchPrescriptions}
              disabled={loading}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 px-5 py-3 rounded-xl text-white"
            >
              <RefreshCw
                size={18}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="bg-red-500/10 border border-red-500 rounded-xl p-6 text-center">
              <AlertTriangle
                className="mx-auto text-red-400 mb-3"
                size={30}
              />
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {!loading && !error && prescriptions.length === 0 && (
            <div className="text-center bg-[#161F33] rounded-2xl p-12">
              <CheckCircle
                className="mx-auto text-emerald-400 mb-3"
                size={45}
              />
              <h2 className="text-2xl text-white font-bold">
                No Pending Prescriptions
              </h2>
            </div>
          )}

          {!loading && !error && prescriptions.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {prescriptions.map((presc) => (
                <div
                  key={presc.prescription_id}
                  className="bg-[#161F33] rounded-2xl p-5 border border-white/10"
                >
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-gray-400 text-xs">
                        Order #{presc.order_id}
                      </p>

                      <h2 className="text-xl font-bold text-white">
                        Rx #{presc.prescription_id}
                      </h2>
                    </div>

                    <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs">
                      Pending
                    </span>
                  </div>

                  <div className="space-y-2 text-gray-300 text-sm mb-5">

                    <div className="flex items-center gap-2">
                      <User size={15} />
                      {presc.customer_name}
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail size={15} />
                      {presc.email}
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin size={15} />
                      {presc.branch_name}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={15} />
                      {new Date(presc.uploaded_at).toLocaleString()}
                    </div>

                  </div>

                  <div className="relative mb-5">

                    <img
                      src={getImageUrl(presc.image_url)}
                      className="h-52 w-full object-contain rounded-xl bg-[#0B1220]"
                    />

                    <button
                      onClick={() =>
                        setSelectedImage(getImageUrl(presc.image_url))
                      }
                      className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex justify-center items-center gap-2 text-white transition"
                    >
                      <Eye size={18} />
                      View
                    </button>

                  </div>

                  {rejectId === presc.prescription_id ? (
                    <>
                      <input
                        type="text"
                        placeholder="Reason..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="w-full mb-3 p-2 rounded-lg bg-[#0B1220] border border-gray-700 text-white"
                      />

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            updatePrescription(
                              presc.prescription_id,
                              "reject"
                            )
                          }
                          disabled={loadingId === presc.prescription_id}
                          className="flex-1 bg-red-600 py-2 rounded-lg text-white"
                        >
                          Confirm
                        </button>

                        <button
                          onClick={() => {
                            setRejectId(null);
                            setReason("");
                          }}
                          className="flex-1 bg-gray-700 py-2 rounded-lg text-white"
                        >
                          Cancel
                        </button>

                      </div>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">

                      <button
                        onClick={() =>
                          updatePrescription(
                            presc.prescription_id,
                            "approve"
                          )
                        }
                        disabled={loadingId === presc.prescription_id}
                        className="bg-emerald-600 py-3 rounded-xl text-white"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => {
                          setRejectId(presc.prescription_id);
                          setReason("");
                        }}
                        className="bg-red-600 py-3 rounded-xl text-white"
                      >
                        Reject
                      </button>

                    </div>
                  )}
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
            {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-h-[90vh] max-w-[90vw] rounded-xl"
          />
        </div>
      )}

      <Footer />
    </>
  );
}