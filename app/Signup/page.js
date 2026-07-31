"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import api, { storeAuth } from "../lib/api";
import { toast } from "../components/Toast";

const SignupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["customer", "pharmacist", "admin"]),
    role_secret: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    branch_id: z.string().optional(),
  })
  .refine(
    function (data) {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  )
  .refine(
    function (data) {
      if (data.role === "admin" || data.role === "pharmacist") {
        return data.role_secret;
      }

      return true;
    },
    {
      message: "Secret key is required for Admin and Pharmacist roles",
      path: ["role_secret"],
    },
  )
  .refine(
    function (data) {
      if (data.role === "pharmacist") {
        const id = Number(data.branch_id);

        if (!data.branch_id) {
          return false;
        }

        if (!Number.isInteger(id)) {
          return false;
        }

        if (id <= 0) {
          return false;
        }
      }

      return true;
    },
    {
      message: "Pharmacists must select a valid Branch ID",
      path: ["branch_id"],
    },
  );

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [role, setRole] = useState("customer");
  const [roleSecret, setRoleSecret] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [branchId, setBranchId] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setError("");

    const result = SignupSchema.safeParse({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      role: role,
      role_secret: roleSecret,
      phone: phone,
      address: address,
      branch_id: branchId,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      let payload = {
        name: name,
        email: email,
        password: password,
        role: role,
      };

      if (phone !== "") {
        payload.phone = phone;
      }

      if (address !== "") {
        payload.address = address;
      }

      if (role === "admin" || role === "pharmacist") {
        payload.role_secret = roleSecret;
      }

      if (branchId !== "") {
        payload.branch_id = Number(branchId);
      }

      const res = await api.post("/auth/register", payload);

      const token = res.data.data.token;
      const user = res.data.data.user;

      storeAuth(token, user);

      toast("Account registered successfully!", "success");

      if (user.role === "admin") {
        router.push("/Admin");
      } else if (user.role === "pharmacist") {
        router.push("/branch");
      } else {
        router.push("/");
      }
    } catch (err) {
      let msg = "Registration failed. Please try again.";

      if (err.response && err.response.data && err.response.data.message) {
        msg = err.response.data.message;
      }

      setError(msg);
      toast(msg, "error");
    } finally {
      setLoading(false);
    }
  }
  let buttonText = "Create Account →";

  if (loading) {
    buttonText = "Registering Account...";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b1120] p-4 sm:p-6">
      <div className="grid w-full max-w-7xl grid-cols-1 md:grid-cols-12 overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-800 shadow-2xl">
        {/* Left Side */}
        <div className="relative hidden md:block md:col-span-5 overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-green-900 min-h-[550px]">
          <Image
            src="/dr.jpeg"
            alt="Medical Illustration"
            fill
            priority
            className="object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent"></div>

          <div className="absolute bottom-12 left-10 right-10 z-10 text-white">
            <p className="mb-4 inline-block rounded-full bg-emerald-500/20 border border-emerald-500/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              💊 Multi-Branch Smart Pharmacy
            </p>

            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
              Join
              <br />
              RxConnect
            </h1>

            <p className="mt-4 text-sm lg:text-base leading-relaxed text-emerald-100/80">
              Create your account to order medicines, track live deliveries,
              upload doctor prescriptions, or manage branch inventory.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:col-span-7 flex items-center justify-center bg-[#111827] px-5 py-8 sm:px-10 sm:py-10 md:px-12">
          <div className="w-full max-w-md">
            <div className="mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Create Account
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-gray-400">
                Enter your information to get started with RxConnect.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs sm:text-sm font-medium text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {/* Role */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase text-gray-300">
                  Select Role
                </label>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("customer")}
                    className={`py-2 rounded-xl text-xs font-semibold border ${
                      role === "customer"
                        ? "bg-emerald-600 border-emerald-500 text-white"
                        : "bg-[#1f2937] border-gray-700 text-gray-400"
                    }`}
                  >
                    Customer
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("pharmacist")}
                    className={`py-2 rounded-xl text-xs font-semibold border ${
                      role === "pharmacist"
                        ? "bg-emerald-600 border-emerald-500 text-white"
                        : "bg-[#1f2937] border-gray-700 text-gray-400"
                    }`}
                  >
                    Pharmacist
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("admin")}
                    className={`py-2 rounded-xl text-xs font-semibold border ${
                      role === "admin"
                        ? "bg-emerald-600 border-emerald-500 text-white"
                        : "bg-[#1f2937] border-gray-700 text-gray-400"
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>
              {(role === "admin" || role === "pharmacist") && (
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase text-amber-400">
                    Secret Key
                  </label>

                  <input
                    type="password"
                    placeholder="Enter Secret Key"
                    value={roleSecret}
                    onChange={(e) => setRoleSecret(e.target.value)}
                    className="w-full rounded-xl border border-amber-500/40 bg-[#1f2937] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-amber-400"
                  />
                </div>
              )}
              {role === "pharmacist" && (
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase text-emerald-400">
                    Branch ID
                  </label>

                  <input
                    type="number"
                    min="1"
                    placeholder="Enter Branch ID"
                    value={branchId}
                    onChange={(e) => setBranchId(e.target.value)}
                    className="w-full rounded-xl border border-emerald-500/40 bg-[#1f2937] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-400"
                  />
                </div>
              )}{" "}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase text-gray-300">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase text-gray-300">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase text-gray-300">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase text-gray-300">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSignup();
                      }
                    }}
                    className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase text-gray-300">
                  Phone (Optional)
                </label>

                <input
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase text-gray-300">
                  Address (Optional)
                </label>

                <textarea
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500 resize-none"
                />
              </div>
              <button
                type="button"
                onClick={handleSignup}
                disabled={loading}
                className="w-full rounded-xl bg-emerald-600 py-3.5 font-bold text-white text-sm transition hover:bg-emerald-500 disabled:opacity-60"
              >
                {buttonText}
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link
                href="/Login"
                className="font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
