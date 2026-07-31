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
        <div className="min-h-screen bg-[#0B1220] flex justify-center items-center text-white text-xl">
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="bg-[#0B1220] min-h-screen p-8 text-white">
        <div className="max-w-7xl mx-auto">

          <div className="bg-gradient-to-r from-gray-900 to-green-600 rounded-3xl p-8 flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-[#263149] flex justify-center items-center text-4xl font-bold">
              {profile.name ? profile.name[0].toUpperCase() : "U"}
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                {profile.name || "Not Available"}
              </h1>

              <p className="text-gray-200 mt-2">
                {profile.email || "Not Available"}
              </p>

              <p className="text-gray-300 mt-1">
                User ID : {profile.id || "N/A"}
              </p>

              <div className="mt-4">
                <span className="bg-green-600 px-4 py-1 rounded-full text-sm capitalize">
                  {profile.role || "User"}
                </span>
              </div>

            </div>

          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-8">

            <div className="lg:col-span-2 bg-[#161F33] rounded-3xl p-8">

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
                className="w-full bg-[#263149] p-4 rounded-xl mb-6 outline-none"
              />

              <label className="block mb-2">
                Email
              </label>

              <input
                value={profile.email}
                disabled
                className="w-full bg-[#1d2435] p-4 rounded-xl mb-6 text-gray-400"
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
                className="w-full bg-[#263149] p-4 rounded-xl mb-6 outline-none"
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
                className="w-full bg-[#263149] p-4 rounded-xl outline-none"
              />

              <button
                disabled
                className="mt-8 bg-gray-600 px-8 py-3 rounded-xl cursor-not-allowed"
              >
                Update API Not Available
              </button>

            </div>
                        <div className="space-y-8">

              <div className="bg-[#161F33] rounded-3xl p-6">

                <h3 className="text-gray-400 uppercase text-sm">
                  Account Information
                </h3>

                <div className="mt-6 space-y-5">

                  <div>
                    <p className="text-gray-400 text-sm">
                      User Role
                    </p>
                    <p className="text-lg font-semibold capitalize">
                      {profile.role || "Not Available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Phone Number
                    </p>
                    <p className="text-lg">
                      {profile.phone || "Not Available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
                      Address
                    </p>
                    <p className="text-lg">
                      {profile.address || "Not Available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">
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

              <div className="bg-[#161F33] rounded-3xl p-6">

                <h3 className="text-gray-400 uppercase text-sm mb-6">
                  Quick Actions
                </h3>

                <button
                  disabled
                  className="w-full bg-gray-600 py-3 rounded-xl cursor-not-allowed mb-4"
                >
                  Edit Profile (Coming Soon)
                </button>

                <button
                  disabled
                  className="w-full bg-green-700/50 py-3 rounded-xl cursor-not-allowed"
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