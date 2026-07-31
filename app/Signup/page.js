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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const SignupSchema = z
    .object({
      email: z.string().email("Enter a valid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const handleSignup = async () => {
    const result = SignupSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      await axios.post("http://localhost:5000/signup", {
        email,
        password,
      });

      alert("Signup Successful");
    } catch (err) {
      alert("Signup Failed");
    }
  }
  let buttonText = "Create Account →";

  if (loading) {
    buttonText = "Registering Account...";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b1120] p-6">
      <div className="grid h-[85vh] w-full max-w-7xl grid-cols-12 overflow-hidden rounded-3xl border border-gray-800 shadow-2xl">

        <div className="relative col-span-5 overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-green-800">
          <Image
            src="/dr.jpeg"
            alt="Medical Illustration"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute bottom-12 left-10 right-10 z-10 text-white">
            <p className="mb-4 inline-block rounded-full bg-emerald-500/20 border border-emerald-500/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              💊 Multi-Branch Smart Pharmacy
            </p>

            <h1 className="text-5xl font-bold leading-tight">
              Join
              <br />
              PharmaBuild
            </h1>

            <p className="mt-6 text-lg leading-8 text-green-100">
              Create your account to order medicines, upload prescriptions and
              access pharmacy services across all branches.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:col-span-7 flex items-center justify-center bg-[#111827] px-5 py-8 sm:px-10 sm:py-10 md:px-12">
          <div className="w-full max-w-md">

            <div className="mb-10">
              <h2 className="text-4xl font-bold text-white">Sign Up</h2>
              <p className="mt-2 text-gray-400">
                Create your PharmaBuild account.
              </p>
            </div>

            <div className="space-y-6">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-5 py-4 text-white placeholder-gray-500 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-5 py-4 text-white placeholder-gray-500 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
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
                href="/login"
                className="font-medium text-green-400 hover:text-green-300"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
