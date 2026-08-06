"use client";

import { useState } from "react";
import { Truck, MapPin, Building2, Phone, KeyRound } from "lucide-react";

export default function DeliveryPage() {
  const [otp, setOtp] = useState("");

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[32px] overflow-hidden bg-white border border-slate-200 px-10 py-10 shadow-sm">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-full px-4 py-2 text-sm font-medium">
            Express Delivery Driver Console
          </div>

          <h1 className="text-5xl font-bold text-slate-900 mt-6">
            Active Route:
            <span className="text-slate-900"> Order #RX-99412</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mt-10">
          <div className="bg-white rounded-[30px] border border-slate-200 p-9 shadow-sm">
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7">
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <Building2 className="text-emerald-700" size={26} />
                </div>

                <div>
                  <h2 className="text-slate-900 text-2xl font-semibold">
                    1. Pickup Pharmacy Branch
                  </h2>

                  <p className="text-slate-700 mt-2 text-lg">
                    RxConnect Central – Healthcare Hub
                  </p>

                  <p className="text-slate-500 mt-1">
                    Items packed & sealed in tamper-evident pouch
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 mt-8">
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <MapPin className="text-emerald-700" size={26} />
                </div>

                <div>
                  <h2 className="text-slate-900 text-2xl font-semibold">
                    2. Customer Delivery Destination
                  </h2>

                  <p className="text-slate-700 mt-2 text-lg">Eleanor Vance</p>

                  <p className="text-slate-500 mt-1">
                    742 Evergreen Terrace, Apt 4B, Central City
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full mt-10 bg-emerald-700 hover:bg-emerald-800 transition rounded-full py-5 text-white font-semibold text-lg flex items-center justify-center gap-3 ">
              <Phone size={22} />
              Call Patient (+91 1234567890)
            </button>
          </div>

          <div className="bg-white rounded-[30px] border border-slate-200 p-9 shadow-sm">
            <div className="flex items-center gap-3">
              <h2 className="text-slate-900 text-3xl font-semibold">
                Customer Handshake OTP Verification
              </h2>
            </div>

            <p className="text-slate-600 mt-8 text-lg leading-8">
              Ask patient for the 4-digit OTP code shown on their RxConnect app
              to complete delivery.
            </p>

            <div className="mt-10">
              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 4-digit OTP e.g. 4829"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-3xl tracking-[8px] text-slate-900 outline-none placeholder:text-slate-400"
              />

              <button
                className="w-full mt-8 bg-emerald-700 hover:bg-emerald-800 transition rounded-full py-5 text-white font-semibold text-lg"
                onClick={() => {
                  if (otp === "4829") {
                    alert("✅ Delivery Completed Successfully");
                  } else {
                    alert("❌ Invalid OTP");
                  }
                }}
              >
                Verify OTP & Complete Delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
