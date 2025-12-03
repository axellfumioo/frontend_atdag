"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/common/providers/LanguageProvider";

export default function Cta() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto -mt-20 relative z-20 px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {t("lp.0.cta_title")}
        </h3>

        <p className="text-gray-600 mb-5 text-sm">
          {t("lp.0.cta_description")}
        </p>

        <button
          onClick={() => router.push("/auth/register")}
          className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
        >
          {t("lp.0.cta_button")}
        </button>
      </div>
    </div>
  );
}
