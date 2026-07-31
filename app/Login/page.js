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

    const result = LoginSchema.safeParse({
      email: email,
      password: password,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
    } catch (err) {
      alert("Login Failed");
    }

    setLoading(false);
  }
  let buttonText = "Sign In →";

  if (loading) {
    buttonText = "Logging in...";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b1120] p-4 sm:p-6">
      <div className="grid w-full max-w-7xl grid-cols-1 md:grid-cols-12 overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-800 shadow-2xl">
        <div className="relative hidden md:block md:col-span-5 overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-green-900 min-h-[500px]">
          <Image
            src="/doctor.jpeg"
            alt="Medical Illustration"
            fill
            priority
            className="object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent"></div>

          <div className="absolute bottom-12 left-10 right-10 z-10 text-white">
            <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              Multi-Branch Smart Pharmacy
            </p>

            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
              Welcome to
              <br />
              RxConnect
            </h1>

            <p className="mt-4 text-sm lg:text-base leading-relaxed text-emerald-100/80">
              Order medicines from nearby pharmacies, upload doctor
              prescriptions, check live branch inventory, and get express
              doorstep delivery.
            </p>
          </div>
        </div>

        <div className="md:col-span-7 flex items-center justify-center bg-[#111827] px-5 py-8 sm:px-10 sm:py-12 md:px-16">
          <div className="w-full max-w-md">
            <div className="mb-6 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Sign In
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-gray-400">
                Enter your credentials to access your RxConnect account.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs sm:text-sm font-medium text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase text-gray-300">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-4 py-3 sm:px-5 sm:py-4 text-sm text-white placeholder-gray-500 outline-none transition focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase text-gray-300">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
                  className="w-full rounded-xl border border-gray-700 bg-[#1f2937] px-4 py-3 sm:px-5 sm:py-4 text-sm text-white placeholder-gray-500 outline-none transition focus:border-emerald-500"
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full rounded-xl bg-emerald-600 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white transition hover:bg-emerald-500 shadow-lg shadow-emerald-900/30 disabled:opacity-60"
              >
                {buttonText}
              </button>
            </div>

            <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/Signup"
                className="font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
