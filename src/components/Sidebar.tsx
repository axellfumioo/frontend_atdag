"use client";

import React from "react";
import { Home, LayoutDashboard, Users, TrendingUp, Radio, Database, ChevronRight, X } from "lucide-react";

const menuItems = [
  { name: "Home", icon: Home, active: true },
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Investors", icon: Users },
  { name: "Investments", icon: TrendingUp },
  { name: "WA Broadcast", icon: Radio, hasArrow: true },
  { name: "Master Data", icon: Database, hasArrow: true },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >


        <nav className="p-3 space-y-1 mt-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm
                  transition-colors duration-150
                  ${
                    item.active
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
                {item.hasArrow && (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}