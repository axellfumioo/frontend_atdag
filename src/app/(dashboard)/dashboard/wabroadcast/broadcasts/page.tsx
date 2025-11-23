"use client";

import React from "react";
import { Megaphone } from "lucide-react";

export default function WABroadcastsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-yellow-500 flex items-center justify-center">
          <Megaphone className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Siaran</h1>
          <p className="text-sm text-gray-500">Lihat dan kelola siaran WhatsApp terjadwal dan terkirim.</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 text-sm text-gray-500">
        Belum ada siaran. Ini halaman placeholder.
      </div>
    </div>
  );
}
