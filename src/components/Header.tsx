"use client";

import React from "react";
import { Menu } from "lucide-react";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-2 px-4 sm:px-6 lg:px-0">
        <button
          aria-label="Open sidebar"
          className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 text-center">
          Get Started with Your Investment Management
        </h1>
        <p className="text-gray-600 text-sm mb-4 sm:mb-8 hidden sm:block text-center">
          This is your central hub for managing investors, tracking investments,
          and maintaining communication through WhatsApp integration. Start by
          exploring the features below.
        </p>
      </div>
    </div>
  );
}
    
    
