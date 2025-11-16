"use client";

import React from "react";
import {
  Home,
  LayoutDashboard,
  Users,
  TrendingUp,
  Radio,
  Database,
  ChevronDown,
  RefreshCw,
  Layers,
  DollarSign,
  MessageCircle,
  Phone,
  UserSquare2,
  FileText,
  Megaphone,
  User,
  LogOut,
  type LucideIcon,
} from "lucide-react";

import { useRouter, usePathname } from "next/navigation";

interface SubMenuItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

interface MenuItem {
  name: string;
  icon: LucideIcon;
  path: string;
  hasArrow?: boolean;
  subItems?: SubMenuItem[];
}

// object icon, path
const menuItems: MenuItem[] = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Investors", icon: Users, path: "/dashboard/investors" },
  { name: "Investments", icon: TrendingUp, path: "/dashboard/investments" },
  { name: "WA Broadcast", icon: MessageCircle, hasArrow: true, path: "/dashboard/wabroadcast", 
    subItems: [
      { name: "Contacts", path:"/dashboard/wabroadcast/contacts", icon: Phone},
      { name: "WA Groups", path:"/dashboard/wabroadcast/wagroups", icon: UserSquare2},
      { name: "Templates", path:"/dashboard/wabroadcast/templates", icon: FileText},
      { name: "Broadcast Groups", path:"/dashboard/wabroadcast/broadcastgroups", icon: Radio},
      { name: "Broadcasts", path:"/dashboard/wabroadcast/broadcasts", icon: Megaphone},
    ]
  },
  { 
    name: "Master Data", 
    icon: Database, 
    hasArrow: true,
    path: "/dashboard/masterdata",
    subItems: [
      { name: "Investment Status", path: "/dashboard/masterdata/investmentstatus", icon: RefreshCw },
      { name: "Investment Stages", path: "/dashboard/masterdata/investmentstages", icon: Layers },
      { name: "Investor Types", path: "/dashboard/masterdata/investortypes", icon: Users },
      { name: "Currencies", path: "/dashboard/masterdata/currencies", icon: DollarSign }
    ]
  },
];

// interface buat hamburger menu, termasuk mobile juga
interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = React.useState<string | null>(null);

  const toggleSubmenu = (menuName: string) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.subItems) {
      toggleSubmenu(item.name);
    } else {
      router.push(item.path);
      setOpen(false); // auto close on mobile
    }
  };

  return (
    <>
      {/* Overlay mobile - keep clickable but transparent to avoid black screen */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 lg:hidden bg-transparent"
        />
      )}
      {/* semisal ukuran web lebih kecil ukuran sidebar jadi gaada alias nampilin hamburger saja, kalo full ya full*/}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} flex flex-col`}
      >
        <nav className="p-3 space-y-1 mt-5 flex-1 overflow-y-auto">
          {/* mapping buat menu item yg didalamnya ada variabel juga */}
          {menuItems.map((item, index) => {
            // simpan item icon
            const Icon = item.icon;
            // expanded menu
            const isExpanded = expandedMenu === item.name;
            // hover ketika di page tertentu
            const isActive =
              pathname === item.path ||
              (item.subItems && pathname.startsWith(item.path));

            return (
              <div key={index}>
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm
                    ${isActive ? "bg-yellow-50 text-yellow-600 font-medium" : "text-gray-700 hover:bg-gray-50"}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                    {/* dropdown item buat wabroadcast sm masterdata */}
                  {item.hasArrow && (
                    <ChevronDown
                      className={`w-4 h-4 transform transition duration-200 
                      ${isExpanded ? "rotate-0" : "-rotate-90"}
                      ${isActive ? "text-yellow-600" : "text-gray-400"}`}
                    />
                  )}
                </button>

                {item.subItems && isExpanded && (
                  <div className="ml-6 mt-1 pl-4 border-l space-y-1 border-gray-200">
                    {item.subItems.map((sub, i) => {
                      const SubIcon = sub.icon;
                      const isSubActive = pathname === sub.path;

                      return (
                        <button
                          key={i}
                          onClick={() => {
                            router.push(sub.path);
                            setOpen(false);
                          }}
                          className={`
                            w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm
                            ${isSubActive ? "bg-yellow-50 text-yellow-600" : "text-gray-600 hover:bg-gray-100"}
                          `}
                        >
                          <SubIcon className="w-4 h-4" />
                          <span>{sub.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

          {/* profile */}
        <div className="mt-auto border-t border-gray-100 px-4 py-4">
          <div className="rounded-2xl border border-yellow-100 bg-white shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-yellow-500/10 text-yellow-600 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">July</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-yellow-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
        </div>

      </aside>

    </>
  );
}