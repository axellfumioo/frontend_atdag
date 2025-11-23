"use client";

import React from "react";
import { FileText } from "lucide-react";

export default function WABroadcastTemplatesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-yellow-500 flex items-center justify-center">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Template Pesan</h1>
          <p className="text-sm text-gray-500">
            Buat dan kelola template pesan WhatsApp yang dapat digunakan kembali.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 text-sm text-gray-500">
        Belum ada template. Ini halaman placeholder.
      </div>
    </div>
  );
}
