"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import Sidebar from "@/components/Sidebar";

type SidebarLayoutContextValue = {
  sidebarCollapsed: boolean;
};

const SidebarLayoutContext = createContext<SidebarLayoutContextValue | undefined>(
  undefined,
);

export function useSidebarLayout() {
  const context = useContext(SidebarLayoutContext);
  if (!context) {
    throw new Error("useSidebarLayout must be used within LayoutClient");
  }
  return context;
}

export default function LayoutClient({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const contextValue = useMemo(
    () => ({
      sidebarCollapsed,
    }),
    [sidebarCollapsed],
  );

  return (
    <SidebarLayoutContext.Provider value={contextValue}>
      <div
        className={`min-h-screen flex ${
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          onCollapseChange={setSidebarCollapsed}
        />

        <div className="flex flex-1 flex-col bg-white">
          <div className="lg:hidden p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md bg-gray-200"
            >
              ☰
            </button>
          </div>

          <main className="flex-1 overflow-auto p-2">{children}</main>
        </div>
      </div>
    </SidebarLayoutContext.Provider>
  );
}