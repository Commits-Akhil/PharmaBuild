"use client";

import { useEffect, useState } from "react";
import { MapPin, CheckCircle2 } from "lucide-react";
import api from "../lib/api";

export default function BranchSection({ singleColumn = false }) {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBranches() {
      setLoading(true);
      setError("");
      try {
        const medRes = await api.get("/medicines");
        const medicinesList =
          medRes.data.medicines ?? medRes.data.data?.medicines ?? [];

        if (medicinesList.length > 0) {
          const stockRes = await api.post("/orders/check-stock", {
            medicines: [{ medicineId: medicinesList[0].id, quantity: 1 }],
          });

          setBranches(stockRes.data.availableBranches ?? []);
        }
      } catch (err) {
        console.error("[BranchSection] Fetch Error:", err);
        setError("Unable to load pharmacy branches from server.");
      } finally {
        setLoading(false);
      }
    }

    loadBranches();
  }, []);

  const gridClass = singleColumn
    ? "grid grid-cols-1 gap-4"
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

  if (loading) {
    return (
      <div className={gridClass}>
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className="bg-white border border-slate-200 rounded-2xl p-5 animate-pulse h-40"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center text-rose-700 text-sm">
        {error}
      </div>
    );
  }

  if (branches.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-slate-500 text-sm">
        No active pharmacy branches currently available.
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {branches.map((branch, index) => {
        const id = branch.branchId || branch.id || index + 1;
        const name =
          branch.branchName || branch.name || `RxConnect Branch #${id}`;
        const location =
          branch.location || branch.address || "Express Delivery Center";

        return (
          <div
            key={id}
            className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-emerald-300 transition flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex flex-wrap sm:flex-nowrap justify-between items-start gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug break-words">
                  {name}
                </h3>
                <span className="bg-emerald-100 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs text-emerald-800 shrink-0 font-mono font-medium whitespace-nowrap border border-emerald-200">
                  Branch #{id}
                </span>
              </div>

              <p className="text-slate-600 mt-2 text-xs flex items-center gap-1.5 leading-tight">
                <MapPin size={14} className="text-emerald-700 shrink-0" />
                <span className="truncate">{location}</span>
              </p>
            </div>

            <div>
              <hr className="border-slate-200 my-3.5 sm:my-4" />

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-emerald-800 font-medium text-[11px] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 shrink-0">
                  <CheckCircle2 size={12} /> Active Branch
                </span>
                <span className="text-slate-600 font-medium text-[11px] shrink-0">
                  Express Delivery
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
