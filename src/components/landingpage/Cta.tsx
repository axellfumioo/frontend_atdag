"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Cta() {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto -mt-20 relative z-20 px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Mulai Kelola Investasi Anda Sekarang
        </h3>

        <p className="text-gray-600 mb-5 text-sm">
          Sistem modern untuk memantau investor, mengelola komunikasi, dan
          menganalisis performa investasi.
        </p>

        <button
          onClick={() => router.push("/auth/register")}
          className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
        >
          Mulai Sekarang
        </button>
      </div>
    </div>
  );
}
