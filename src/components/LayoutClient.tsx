"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex lg:pl-64">

      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-1 flex-col bg-white">
        <div className="lg:hidden p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md bg-gray-200"
          >
            ☰
          </button>
        </div>

        <main className="flex-1 overflow-auto p-2">
          {children}
        </main>
      </div>

    </div>
  );
}