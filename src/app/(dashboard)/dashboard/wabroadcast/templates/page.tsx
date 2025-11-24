"use client";

import React, { useMemo } from "react";
import { FileText } from "lucide-react";
import { useSidebarLayout } from "@/components/LayoutClient";

export default function WABroadcastTemplatesPage() {
  const { sidebarCollapsed } = useSidebarLayout();
  const containerWidthClass = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed],
  );
  return (
    <div className={`${containerWidthClass} mx-auto px-4 py-4 space-y-4`}>
      <section className="rounded-2xl border border-yellow-100 bg-white/95 px-5 py-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Template Pesan</h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              Buat dan kelola template pesan WhatsApp yang dapat digunakan kembali.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-white rounded-2xl shadow-sm border border-yellow-100 overflow-hidden">
        <div className="p-6 text-sm text-gray-500">Belum ada template. Ini halaman placeholder.</div>
      </div>
    </div>
  );
}
