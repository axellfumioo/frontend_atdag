"use client";

import React from "react";
import { Home, LayoutDashboard, Users, TrendingUp, Radio, Database, ChevronRight, X, ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface SubItem {
  name: string;
  path: string;
}

interface MenuItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path: string;
  hasArrow?: boolean;
  subItems?: SubItem[];
}

const menuItems: MenuItem[] = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Investors", icon: Users, path: "/investors" },
  { name: "Investments", icon: TrendingUp, path: "/investments" },
  { name: "WA Broadcast", icon: Radio, hasArrow: true, path: "/wabroadcast" },
  { 
    name: "Master Data", 
    icon: Database, 
    hasArrow: true,
    path: "/masterdata",
    subItems: [
      { name: "Currencies", path: "/masterdata/currencies" },
      { name: "Investment Stages", path: "/masterdata/investmentstages" },
      { name: "Investment Status", path: "/masterdata/investmentstatus" },
      { name: "Investor Types", path: "/masterdata/investortypes" }
    ]
  },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = React.useState<string | null>(null);

  // Auto-expand Master Data if on a submenu page
  React.useEffect(() => {
    if (pathname.startsWith("/masterdata")) {
      setExpandedMenu("Master Data");
    }
  }, [pathname]);

  const toggleSubmenu = (menuName: string) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.subItems) {
      toggleSubmenu(item.name);
    } else {
      router.push(item.path);
    }
  };

  return (
    <>
    {/* buat mobile */}
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
        {/* Sidebar Header */}
        {/* <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-semibold">Y</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">You</p>
              <p className="text-xs text-gray-500">Today at 10:34</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div> */}

        <nav className="p-3 space-y-1 mt-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isExpanded = expandedMenu === item.name;
            const isActive = pathname === item.path || (item.subItems && pathname.startsWith(item.path));
            
            return (
              <div key={index}>
                <button
                  onClick={() => handleMenuClick(item)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm
                    transition-colors duration-150
                    ${
                      isActive
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
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? 'rotate-0' : '-rotate-90'
                      } ${isActive ? 'text-blue-500' : 'text-gray-400'}`} 
                    />
                  )}
                </button>

                {/* Submenu masterdata */}
                {item.subItems && isExpanded && (
                  <div className="ml-6 mt-1 space-y-1 pl-4 border-l-2 border-gray-200">
                    {item.subItems.map((subItem, subIndex) => {
                      const isSubActive = pathname === subItem.path;
                      return (
                        <button
                          key={subIndex}
                          onClick={() => router.push(subItem.path)}
                          className={`
                            w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm
                            transition-colors duration-150
                            ${
                              isSubActive
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }
                          `}
                        >
                          <Database className="w-4 h-4" />
                          <span>{subItem.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}