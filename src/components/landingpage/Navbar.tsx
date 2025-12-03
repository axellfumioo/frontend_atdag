"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/common/providers/LanguageProvider";

export default function Navbar() {
  const router = useRouter();

  const authActions = {
    login: "/auth/login",
    signup: "/auth/register",
  };

  const { lang, setLang } = useLanguage();

  const toggleLang = () => {
    setLang(lang === "id" ? "en" : "id");
  };

  return (
    <nav className="py-3 px-3">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-full px-8 py-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <Image
              src="/logo-export.png"
              alt="Logo"
              width={120}
              height={48}
              className="h-12 object-contain"
              priority
            />

            <div className="flex items-center gap-4">
              {/* Toggle Language di sebelah kiri Login */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 shadow-sm text-sm font-medium hover:bg-gray-100 transition"
              >
                {lang === "id" ? "EN" : "ID"}
              </button>

              <p
                onClick={() => router.push(authActions.login)}
                className="text-sm text-gray-700 font-medium hover:text-gray-900 cursor-pointer hover:underline"
              >
                Login
              </p>

              <button
                onClick={() => router.push(authActions.signup)}
                className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                Sign up <span className="text-xs">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
