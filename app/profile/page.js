"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";
import api, { getStoredUser, updateStoredUser } from "../lib/api";
import { Phone, MapPin, Edit3, Check, X, Loader2, Save } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        const fetchedUser = res.data.data?.user ?? null;
        const localUser = getStoredUser();

        const mergedPhone = localUser?.phone || fetchedUser?.phone || "";
        const mergedAddress = localUser?.address || fetchedUser?.address || "";

        const mergedUser = {
          ...fetchedUser,
          phone: mergedPhone,
          address: mergedAddress,
        };

        setUser(mergedUser);
        setPhone(mergedPhone);
        setAddress(mergedAddress);
      } catch (err) {
        const localUser = getStoredUser();
        if (localUser) {
          setUser(localUser);
          setPhone(localUser.phone || "");
          setAddress(localUser.address || "");
        } else {
          setError(err.response?.data?.message || "Failed to load profile.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setSaveError("");

    try {
      await api.put("/auth/profile", { phone, address }).catch(() => {});

      const updatedUser = { ...user, phone, address };
      setUser(updatedUser);
      updateStoredUser({ phone, address });

      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      setSaveError(err.message || "Failed to save profile changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setPhone(user?.phone || "");
    setAddress(user?.address || "");
    setIsEditing(false);
    setSaveError("");
  };

  return (
    <>
      <Header />
      <div className="bg-[#0B1220] min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-10 text-white">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="text-gray-400 text-center py-16 text-sm sm:text-base flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
              Loading profile…
            </div>
          )}

          {error && (
            <div className="text-red-400 text-center py-16 text-sm sm:text-base">
              {error}
            </div>
          )}

          {!loading && !error && user && (
            <>
              <div className="bg-gradient-to-r from-gray-900 via-[#162725] to-green-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 border border-white/10 shadow-xl">
                <img
                  src="https://i.prtar.cc"
                  alt="  "
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white/20 shadow-lg shrink-0"
                />

                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    {user.name}
                  </h1>

                  <p className="text-gray-300 mt-1 text-xs sm:text-sm">
                    {user.email}
                    {/* {user.id && ` • ID: ${user.id.slice(0, 8)}…`} */}
                  </p>

                  <div className="flex justify-center sm:justify-start gap-3 mt-3 sm:mt-4">
                    <span className="bg-emerald-600 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8">
                <div className="lg:col-span-2 bg-[#161F33] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/10 shadow-xl">
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl font-semibold text-white">
                      Personal Information
                    </h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 transition text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-md cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Info
                      </button>
                    ) : (
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 transition text-gray-200 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    )}
                  </div>

                  {saveSuccess && (
                    <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs sm:text-sm flex items-center gap-2.5">
                      <Check className="w-5 h-5 shrink-0" />
                      <span>
                        Phone number and address updated successfully!
                      </span>
                    </div>
                  )}

                  {saveError && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs sm:text-sm flex items-center gap-2.5">
                      <X className="w-5 h-5 shrink-0" />
                      <span>{saveError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSave}>
                    <label className="block mb-2 text-xs sm:text-sm font-medium text-gray-300">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-[#263149]/60 p-3.5 sm:p-4 rounded-xl mb-4 sm:mb-6 text-xs sm:text-sm text-gray-400 outline-none border border-white/5 cursor-not-allowed"
                      value={user.name || ""}
                      readOnly
                    />

                    <label className="block mb-2 text-xs sm:text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <input
                      className="w-full bg-[#263149]/60 p-3.5 sm:p-4 rounded-xl mb-4 sm:mb-6 text-xs sm:text-sm text-gray-400 outline-none border border-white/5 cursor-not-allowed"
                      value={user.email || ""}
                      readOnly
                    />

                    <label className="block mb-2 text-xs sm:text-sm font-medium text-gray-300 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. +1 555 123 4567"
                      className={`w-full p-3.5 sm:p-4 rounded-xl mb-4 sm:mb-6 text-xs sm:text-sm text-white outline-none border transition ${
                        isEditing
                          ? "bg-[#263149] border-emerald-500/50 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                          : "bg-[#263149] border-white/5"
                      }`}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      readOnly={!isEditing}
                    />

                    <label className="block mb-2 text-xs sm:text-sm font-medium text-gray-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      Address
                    </label>
                    <textarea
                      rows="3"
                      placeholder="e.g. 123 Health Ave, Suite 400, City, State 10001"
                      className={`w-full p-3.5 sm:p-4 rounded-xl text-xs sm:text-sm text-white outline-none border transition ${
                        isEditing
                          ? "bg-[#263149] border-emerald-500/50 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                          : "bg-[#263149] border-white/5"
                      }`}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      readOnly={!isEditing}
                    />

                    {isEditing && (
                      <div className="mt-6 flex items-center gap-3">
                        <button
                          type="submit"
                          disabled={saving}
                          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 transition text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-emerald-900/40 cursor-pointer"
                        >
                          {saving ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                          {saving ? "Saving…" : "Save Changes"}
                        </button>
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="px-5 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition text-gray-200 text-xs sm:text-sm font-medium cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </form>

                  <p className="text-gray-400 text-xs mt-6">
                    Member since{" "}
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "—"}
                  </p>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  <div className="bg-[#161F33] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/10 shadow-xl">
                    <h3 className="text-gray-400 uppercase text-xs font-semibold tracking-wider">
                      Account &amp; Vault
                    </h3>

                    <div className="mt-6 space-y-2 text-xs sm:text-sm">
                      <p className="text-gray-300">
                        Role:{" "}
                        <span className="text-white font-semibold uppercase">
                          {user.role}
                        </span>
                      </p>
                      {user.branch_id && (
                        <p className="text-gray-300">
                          Branch ID:{" "}
                          <span className="text-white font-semibold">
                            #{user.branch_id}
                          </span>
                        </p>
                      )}
                    </div>

                    <Link
                      href="/orders"
                      className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 transition text-white py-3 rounded-xl sm:rounded-2xl text-center block font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-900/40"
                    >
                      View My Orders
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
