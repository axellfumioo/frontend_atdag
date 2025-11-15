"use client";

import React from "react";
import { Phone } from "lucide-react";

export default function WABroadcastContactsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-yellow-500 flex items-center justify-center">
          <Phone className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">WA Contacts</h1>
          <p className="text-sm text-gray-500">
            Manage WhatsApp contacts used for broadcasts and campaigns.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 text-sm text-gray-500">
        No contacts yet. This is a placeholder page.
      </div>
    </div>
  );
}
