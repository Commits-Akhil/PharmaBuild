"use client";

import { useState } from "react";
import { Truck, MapPin, Building2, Phone, KeyRound } from "lucide-react";

export default function DeliveryPage() {
  const [otp, setOtp] = useState("");

  return (
    <div className="min-h-screen bg-[#070C17] px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[32px] overflow-hidden bg-gradient-to-r from-green-700 to-[#121A33] px-10 py-10">
          <div className="inline-flex items-center gap-2 bg-[#9B5A12]/30 border border-[#E0A126]/40 text-[#F8C646] rounded-full px-4 py-2 text-sm font-medium">
            Express Delivery Driver Console
          </div>

          <h1 className="text-5xl font-bold text-white mt-6">
            Active Route:
            <span className="text-[#F5F5F5]"> Order #RX-99412</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mt-10">
          <div className="bg-[#111A2D] rounded-[30px] border border-white/10 p-9">
            <div className="rounded-3xl border border-green-500 bg-[#0E2A31] p-7">
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-green-600/20 flex items-center justify-center">
                  <Building2 className="text-green-400" size={26} />
                </div>

                <div>
                  <h2 className="text-white text-2xl font-semibold">
                    1. Pickup Pharmacy Branch
                  </h2>

                  <p className="text-gray-300 mt-2 text-lg">
                    RxConnect Central – Healthcare Hub
                  </p>

                  <p className="text-gray-500 mt-1">
                    Items packed & sealed in tamper-evident pouch
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-500 bg-[#0E2A31] p-7 mt-8">
              <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 flex items-center justify-center">
                  <MapPin className="text-emerald-400" size={26} />
                </div>

                <div>
                  <h2 className="text-white text-2xl font-semibold">
                    2. Customer Delivery Destination
                  </h2>

                  <p className="text-gray-300 mt-2 text-lg">Eleanor Vance</p>

                  <p className="text-gray-500 mt-1">
                    742 Evergreen Terrace, Apt 4B, Central City
                  </p>
                </div>
              </div>
            </div>

            <button className="w-full mt-10 bg-green-500 hover:opacity-90 transition rounded-full py-5 text-white font-semibold text-lg flex items-center justify-center gap-3 ">
              <Phone size={22} />
              Call Patient (+91 1234567890)
            </button>
          </div>

          <div className="bg-[#111A2D] rounded-[30px] border border-white/10 p-9">
            <div className="flex items-center gap-3">
              <h2 className="text-white text-3xl font-semibold">
                Customer Handshake OTP Verification
              </h2>
            </div>

            <p className="text-gray-400 mt-8 text-lg leading-8">
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
                className="w-full bg-[#263149] border border-white/10 rounded-2xl px-6 py-5 text-3xl tracking-[8px] text-white outline-none placeholder:text-gray-500"
              />

              <button
                className="w-full mt-8 bg-emerald-500 hover:bg-emerald-600 transition rounded-full py-5 text-white font-semibold text-lg shadow-lg shadow-emerald-500/20"
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
