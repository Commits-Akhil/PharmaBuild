"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import api from "../lib/api";
import { z } from "zod";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const SignupSchema = z
    .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Enter a valid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const handleSignup = async () => {
    const result = SignupSchema.safeParse({ name, email, password, confirmPassword });

    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role: "customer",
      });

      const token = res.data?.data?.token || res.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }

      alert("Signup Successful");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || err.message || "Signup Failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b1120] p-6">
      <div className="grid h-[85vh] w-full max-w-7xl grid-cols-12 overflow-hidden rounded-3xl border border-gray-800 shadow-2xl">

        <div className="relative col-span-5 overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-green-800">
          <Image src="/dr.jpeg" alt="Medical Illustration" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-12 left-10 right-10 z-10 text-white">
            <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
              💊 Multi-Branch Smart Pharmacy
            </p>
            <h1 className="text-5xl font-bold leading-tight">Join<br />PharmaBuild</h1>
            <p className="mt-6 text-lg leading-8 text-green-100">
              Create your account to order medicines, upload prescriptions and access pharmacy services across all branches.
            </p>
          </div>
        </div>

        <div className="col-span-7 flex items-center justify-center bg-[#111827] px-12">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-white">Sign Up</h2>
              <p className="mt-2 text-gray-400">Create your PharmaBuild account.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-5 py-4 text-white placeholder-gray-500 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-5 py-4 text-white placeholder-gray-500 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-5 py-4 text-white placeholder-gray-500 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-5 py-4 text-white placeholder-gray-500 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30"
                />
              </div>

              <button
                onClick={handleSignup}
                className="w-full rounded-xl bg-green-500 py-4 font-semibold text-white transition hover:bg-green-600"
              >
                Sign Up
              </button>
            </div>

            <p className="mt-8 text-center text-gray-400">
              Already have an account?{" "}
              <Link href="/Login" className="font-medium text-green-400 hover:text-green-300">
                Login
              </Link>
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}