"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn } from "lucide-react";
import api from "@/common/lib/apiClient";
import Toast from 'typescript-toastify';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("register") === "true") {
      new Toast({
        position: "top-right",
        toastMsg: "Register Success! Please Login.",
        autoCloseTime: 4000,
        canClose: true,
        showProgress: true,
        pauseOnHover: true,
        pauseOnFocusLoss: true,
        type: "success",
        theme: "light",
      });

      params.delete("register");
      const newSearch = params.toString();
      const newUrl =
        window.location.pathname + (newSearch ? `?${newSearch}` : "");
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/login",
        { email, password }
      );

      const { token, user } = res.data.data;

      sessionStorage.setItem("jwt_token", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat login bro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl px-8 py-10">
          <h1 className="text-2xl font-semibold text-gray-900 text-center">
            Sign in to your account
          </h1>

          <form className="mt-4 space-y-6" onSubmit={handleLogin}>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => router.push('/auth/register')}
                className="text-yellow-600 hover:text-yellow-800 font-medium text-sm"
              >
                Belum punya akun? Daftar di sini
              </button>
            </div>
            {/* EMAIL */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition bg-white"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-md border border-gray-300 focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 transition bg-white"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition font-medium shadow-sm"
            >
              <LogIn className="w-4 h-4 top-1/2" />
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              type="button"
              onClick={() => (window.location.href = "/api/auth/google")}
              className="w-full py-2.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition flex items-center justify-center gap-2 text-gray-700 font-medium"
            >
              <img
                className="h-4 w-4"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
              />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}