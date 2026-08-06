"use client";

import { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import api from "../lib/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
    created_at: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const res = await api.get("/auth/profile");

      const user = res.data.data.user;

      setProfile({
        id: user.id ?? null,
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        address: user.address ?? "",
        role: user.role ?? "",
        created_at: user.created_at ?? "",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-50 flex justify-center items-center text-slate-700 text-xl">
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="bg-slate-50 min-h-screen p-8 text-slate-900">
        <div className="max-w-7xl mx-auto">

          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex items-center gap-6 shadow-sm">

            <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex justify-center items-center text-4xl font-bold">
              {profile.name ? profile.name[0].toUpperCase() : "U"}
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                {profile.name || "Not Available"}
              </h1>

              <p className="text-slate-600 mt-2">
                {profile.email || "Not Available"}
              </p>

              <p className="text-slate-500 mt-1">
                User ID : {profile.id || "N/A"}
              </p>

              <div className="mt-4">
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-4 py-1 rounded-full text-sm capitalize">
                  {profile.role || "User"}
                </span>
              </div>

            </div>

          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-8">

            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">

              <h2 className="text-2xl font-semibold mb-8">
                Personal Information
              </h2>

              <label className="block mb-2">
                Full Name
              </label>

              <input
                value={profile.name}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    name: e.target.value,
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl mb-6 outline-none"
              />

              <label className="block mb-2">
                Email
              </label>

              <input
                value={profile.email}
                disabled
                className="w-full bg-slate-100 border border-slate-200 p-4 rounded-xl mb-6 text-slate-500"
              />

              <label className="block mb-2">
                Phone Number
              </label>

              <input
                value={profile.phone}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    phone: e.target.value,
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl mb-6 outline-none"
              />

              <label className="block mb-2">
                Address
              </label>

              <textarea
                rows={4}
                value={profile.address}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    address: e.target.value,
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none"
              />

              <button
                disabled
                className="mt-8 bg-slate-300 text-slate-700 px-8 py-3 rounded-xl cursor-not-allowed"
              >
                Update API Not Available
              </button>

            </div>
                        <div className="space-y-8">

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

                <h3 className="text-slate-500 uppercase text-sm">
                  Account Information
                </h3>

                <div className="mt-6 space-y-5">

                  <div>
                    <p className="text-slate-500 text-sm">
                      User Role
                    </p>
                    <p className="text-lg font-semibold capitalize">
                      {profile.role || "Not Available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500 text-sm">
                      Phone Number
                    </p>
                    <p className="text-lg">
                      {profile.phone || "Not Available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500 text-sm">
                      Address
                    </p>
                    <p className="text-lg">
                      {profile.address || "Not Available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500 text-sm">
                      Joined On
                    </p>
                    <p className="text-lg">
                      {profile.created_at
                        ? new Date(profile.created_at).toLocaleDateString()
                        : "Not Available"}
                    </p>
                  </div>

                </div>

              </div>

              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">

                <h3 className="text-slate-500 uppercase text-sm mb-6">
                  Quick Actions
                </h3>

                <button
                  disabled
                  className="w-full bg-slate-300 text-slate-700 py-3 rounded-xl cursor-not-allowed mb-4"
                >
                  Edit Profile (Coming Soon)
                </button>

                <button
                  disabled
                  className="w-full bg-emerald-200 text-emerald-800 py-3 rounded-xl cursor-not-allowed"
                >
                  Prescription Vault (Coming Soon)
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}