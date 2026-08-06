"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import api, { storeAuth } from "../lib/api";
import { toast } from "../components/Toast";

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");

    const result = LoginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.data.token;
      const user = res.data.data.user;

      storeAuth(token, user);
      toast("Welcome back, " + (user.name || "User") + "!", "success");

      if (user.role === "admin") router.push("/Admin");
      else if (user.role === "pharmacist") router.push("/branch");
      else router.push("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(msg);
      toast(msg, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 sm:p-6">
      <div className="grid w-full max-w-7xl grid-cols-1 md:grid-cols-12 overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm bg-white">
        <div className="relative hidden md:block md:col-span-5 overflow-hidden min-h-[500px] border-r border-slate-200">
          <Image
            src="/doctor.jpeg"
            alt="Medical Illustration"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/45"></div>
          <div className="absolute bottom-12 left-10 right-10 z-10 text-white">
            <p className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              Multi-Branch Smart Pharmacy
            </p>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
              Welcome to
              <br />
              RxConnect
            </h1>
            <p className="mt-4 text-sm lg:text-base leading-relaxed text-slate-100">
              Order medicines from nearby pharmacies and track delivery with verified fulfillment.
            </p>
          </div>
        </div>

        <div className="md:col-span-7 flex items-center justify-center px-5 py-8 sm:px-10 sm:py-12 md:px-16 bg-white">
          <div className="w-full max-w-md">
            <div className="mb-6 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Sign In</h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500">
                Enter your credentials to access your RxConnect account.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs sm:text-sm font-medium text-rose-700">
                {error}
              </div>
            )}

            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase text-slate-600">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 sm:px-5 sm:py-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase text-slate-600">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin();
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 sm:px-5 sm:py-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-emerald-400"
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full rounded-xl bg-emerald-700 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white transition hover:bg-emerald-800 disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Sign In →"}
              </button>
            </div>

            <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <Link href="/Signup" className="font-semibold text-emerald-700 hover:text-emerald-800">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
