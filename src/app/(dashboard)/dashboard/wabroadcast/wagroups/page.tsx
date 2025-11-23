
"use client";

import React, { useState } from "react";
import { Users, Search, RefreshCw, Upload } from "lucide-react";

export default function WABroadcastGroupsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-yellow-500 flex items-center justify-center">
          <Users className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Grup WA</h1>
          <p className="text-sm text-gray-500">Kelola grup WhatsApp untuk mengatur audiens siaran kamu.</p>
        </div>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          {/* Search */}
          <div className="w-full sm:max-w-xs relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari grup..."
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Segarkan</span>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-sm text-white hover:bg-yellow-600 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Impor Grup</span>
            </button>
          </div>
        </div>

        {/* Empty state */}
        <div className="py-10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center mb-4">
            <Upload className="w-7 h-7 text-gray-300" />
          </div>
          <p className="text-sm text-gray-500 mb-4">Tidak ada grup WhatsApp yang diimpor</p>
          <button className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-yellow-500 text-sm text-white hover:bg-yellow-600 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Impor Grup</span>
          </button>
        </div>
      </div>
    </div>
  );
}
