"use client";

import React from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Radio,
  Database,
  ChevronDown,
  ChevronRight,
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
  PanelRightOpen,
  PanelRightClose,
  type LucideIcon,
} from "lucide-react";

import { useRouter, usePathname } from "next/navigation";
import { authService } from "@/services/AuthService";

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

interface SessionUser {
  name?: string;
  role?: {
    role_name?: string;
  };
}

// object icon, path
const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Investor", icon: Users, path: "/dashboard/investors" },
  { name: "Investasi", icon: TrendingUp, path: "/dashboard/investments" },
  { name: "Pengguna", icon: UserSquare2, path: "/dashboard/users" },
  {
    name: "Siaran WA",
    icon: MessageCircle,
    hasArrow: true,
    path: "/dashboard/wabroadcast",
    subItems: [
      {
        name: "Kontak",
        path: "/dashboard/wabroadcast/contacts",
        icon: Phone,
      },
      {
        name: "Grup WA",
        path: "/dashboard/wabroadcast/wagroups",
        icon: UserSquare2,
      },
      {
        name: "Template Pesan",
        path: "/dashboard/wabroadcast/templates",
        icon: FileText,
      },
      {
        name: "Grup Siaran",
        path: "/dashboard/wabroadcast/broadcastgroups",
        icon: Radio,
      },
      {
        name: "Siaran",
        path: "/dashboard/wabroadcast/broadcasts",
        icon: Megaphone,
      },
    ],
  },
  {
    name: "Data Utama",
    icon: Database,
    hasArrow: true,
    path: "/dashboard/masterdata",
    subItems: [
      {
        name: "Status Investasi",
        path: "/dashboard/masterdata/investmentstatus",
        icon: RefreshCw,
      },
      {
        name: "Tahapan Investasi",
        path: "/dashboard/masterdata/investmentstages",
        icon: Layers,
      },
      {
        name: "Tipe Investor",
        path: "/dashboard/masterdata/investortypes",
        icon: Users,
      },
      {
        name: "Mata Uang",
        path: "/dashboard/masterdata/currencies",
        icon: DollarSign,
      },
    ],
  },
];

// interface buat hamburger menu, termasuk mobile juga
interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCollapseChange?: (collapsed: boolean) => void;
}

export default function Sidebar({ open, setOpen, onCollapseChange }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = React.useRef<HTMLElement | null>(null);
  const hoverTimeoutRef = React.useRef<number | null>(null);
  const [expandedMenu, setExpandedMenu] = React.useState<string | null>(null);
  const [userData, setUser] = React.useState<SessionUser | null>(null);
  const [collapsed, setCollapsed] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : false
  );
  const [collapsedFlyoutPos, setCollapsedFlyoutPos] = React.useState<
    { top: number; left: number } | null
  >(null);
  const [collapsedHoverItem, setCollapsedHoverItem] = React.useState<
    MenuItem | null
  >(null);

  React.useEffect(() => {
    const raw = sessionStorage.getItem("user");
    if (!raw) return;
    try {
      setUser(JSON.parse(raw) as SessionUser);
    } catch (err) {
      console.error("Failed to parse user from sessionStorage", err);
    }
  }, []);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = () => {
      setIsDesktop(mediaQuery.matches);
      if (!mediaQuery.matches) {
        setCollapsed(false);
        setExpandedMenu(null);
      }
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  React.useEffect(() => {
    onCollapseChange?.(collapsed);
  }, [collapsed, onCollapseChange]);

  React.useEffect(() => {
    const parentWithActiveChild = menuItems.find((item) => {
      if (!item.subItems) return false;
      const isDirectParent =
        pathname === item.path || pathname.startsWith(`${item.path}/`);
      const hasActiveChild = item.subItems.some((sub) =>
        pathname.startsWith(sub.path)
      );
      return isDirectParent || hasActiveChild;
    });

    if (parentWithActiveChild) {
      setExpandedMenu(parentWithActiveChild.name);
    } else {
      setExpandedMenu(null);
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
      setOpen(false); // auto close on mobile
    }
  };

  const handleMenuHover = (
    item: MenuItem,
    entering: boolean,
    event?: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!collapsed || !item.subItems) return;

    if (entering && event) {
      const itemRect = event.currentTarget.getBoundingClientRect();
      const sidebarRect = sidebarRef.current?.getBoundingClientRect();
      const baseLeft = sidebarRect ? sidebarRect.right : itemRect.right;

      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }

      setExpandedMenu(item.name);
      setCollapsedHoverItem(item);
      setCollapsedFlyoutPos({
        top: itemRect.top,
        left: baseLeft + 2,
      });
    } else if (!entering) {
      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
      hoverTimeoutRef.current = window.setTimeout(() => {
        setExpandedMenu(null);
        setCollapsedFlyoutPos(null);
        setCollapsedHoverItem(null);
        hoverTimeoutRef.current = null;
      }, 260);
    }
  };

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;
      setExpandedMenu(null);
      setCollapsedFlyoutPos(null);
      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
       setCollapsedHoverItem(null);
      return next;
    });
  };

  const handleLogout = async () => {
    const res = await authService.logout();
    if (res) {
      router.push("/");
    }
  };

  return (
    <>
      {/* Overlay mobile - keep clickable but transparent to avoid black screen */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 lg:hidden bg-black/20 backdrop-blur-[1px]"
        />
      )}
      {/* semisal ukuran web lebih kecil ukuran sidebar jadi gaada alias nampilin hamburger saja, kalo full ya full*/}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 ${
          collapsed ? "w-20" : "w-64 sm:w-72 lg:w-64"
        } bg-white/95 border-r border-yellow-100
        shadow-sm backdrop-blur-md touch-pan-y select-none
        ${
          collapsed
            ? "overflow-hidden"
            : "overflow-y-auto overflow-x-hidden"
        }
        transform transition-transform duration-300 lg:transition-[width] lg:duration-300 lg:ease-in-out lg:transform-none
        ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } flex flex-col`}
        draggable={false}
        onDragStart={(event) => event.preventDefault()}
      >
        <div className="px-5 pt-5 pb-4 border-b border-yellow-200 bg-linear-to-br from-yellow-50 to-white">
          <div className={`flex items-center gap-2 ${collapsed ? "justify-end" : "justify-between"}`}>
            <div
              className={`flex items-center transition-all duration-200 flex-1 ${
                collapsed
                  ? "opacity-0 pointer-events-none -translate-x-3 w-0"
                  : "opacity-100 translate-x-0"
              }`}
            >
              <Image
                src="/logo-export.png"
                alt="Atdag Panel"
                width={140}
                height={40}
                className=" h-15 w-auto"
                priority
              />
            </div>
            {isDesktop && (
              <button
                type="button"
                onClick={toggleCollapse}
                className={`mr-1 inline-flex items-center justify-center text-gray-400 transition hover:text-yellow-700 ${
                  collapsed ? "h-9 w-9" : "h-9 w-9"
                }`}
                aria-pressed={collapsed}
                aria-label={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
              >
                {collapsed ? (
                  <PanelRightOpen className="w-5 h-5" />
                ) : (
                  <PanelRightClose className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>

        <nav
          className={`flex-1 py-5 space-y-2 ${
            collapsed
              ? "px-2 overflow-visible"
              : "px-3 overflow-y-auto overflow-x-hidden"
          }`}
        >
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
              <div
                key={index}
                className={`space-y-1 ${collapsed ? "relative" : ""}`}
                onMouseEnter={(e) => handleMenuHover(item, true, e)}
                onMouseLeave={() => handleMenuHover(item, false)}
              >
                <button
                  type="button"
                  onClick={() => handleMenuClick(item)}
                  className={`
                    w-full flex items-center ${collapsed ? "justify-center" : "justify-between"} px-3.5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200
                    ${
                      isActive
                        ? "bg-linear-to-r from-yellow-500/15 via-yellow-500/5 to-transparent text-yellow-700 border-yellow-200 shadow-sm"
                        : "text-gray-600 border-transparent hover:border-yellow-100 hover:bg-yellow-50/60"
                    }
                  `}
                  aria-expanded={item.subItems ? isExpanded : undefined}
                  aria-controls={item.subItems ? `${item.name}-submenu` : undefined}
                  title={collapsed ? item.name : undefined}
                >
                  <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
                    {!collapsed && (
                      <span
                        className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                          isActive
                            ? "bg-yellow-500 shadow-[0_0_0_3px_rgba(250,204,21,0.25)]"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                    <Icon className={`w-5 h-5 ${isActive ? "text-yellow-600" : "text-gray-400"}`} />
                    {!collapsed && <span>{item.name}</span>}
                  </div>
                  {/* dropdown item buat wabroadcast sm masterdata */}
                  {item.hasArrow && !collapsed && (
                    <ChevronDown
                      className={`w-4 h-4 transform transition duration-200 
                      ${isExpanded ? "rotate-0" : "-rotate-90"}
                      ${isActive ? "text-yellow-600" : "text-gray-400"}`}
                    />
                  )}
                </button>

                {item.subItems && !collapsed && (
                  <div
                    id={`${item.name}-submenu`}
                    className={`ml-5 pl-3 border-l border-yellow-200 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? "max-h-96 opacity-100 py-2" : "max-h-0 opacity-0"
                    }`}
                    aria-hidden={!isExpanded}
                  >
                    {item.subItems.map((sub, i) => {
                      const SubIcon = sub.icon;
                      const isSubActive = pathname === sub.path;

                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            router.push(sub.path);
                            setOpen(false);
                          }}
                          className={`
                            w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm transition-colors
                            ${
                              isSubActive
                                ? "bg-yellow-50 text-yellow-700"
                                : "text-gray-500 hover:bg-yellow-50/70"
                            }
                          `}
                        >
                          <SubIcon className={`w-4 h-4 ${isSubActive ? "text-yellow-600" : "text-gray-400"}`} />
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
        <div className={`mt-auto border-t border-yellow-100 bg-linear-to-tr from-yellow-50/60 to-white ${
          collapsed ? "px-2 py-4" : "px-4 py-5"
        }`}>
          <div className={`rounded-2xl border border-yellow-100 bg-white/80 backdrop-blur shadow-sm ${
            collapsed ? "p-2.5" : "p-3.5"
          }`}>
            {collapsed ? (
              <>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-yellow-500/15 text-yellow-600 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleLogout()}
                  className="mt-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500 text-white shadow hover:bg-yellow-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="sr-only">Keluar dari aplikasi</span>
                </button>
              </>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-yellow-500/15 text-yellow-600 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {userData?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {userData?.role?.role_name}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleLogout()}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500 text-white shadow hover:bg-yellow-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="sr-only">Keluar dari aplikasi</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {collapsed &&
        collapsedHoverItem &&
        collapsedHoverItem.subItems &&
        collapsedFlyoutPos && (
          <div
            id={`${collapsedHoverItem.name}-submenu-collapsed`}
            className="fixed z-50 min-w-[220px] rounded-2xl border border-yellow-100 bg-white shadow-md transition-all duration-200"
            style={{
              top: collapsedFlyoutPos.top,
              left: collapsedFlyoutPos.left,
            }}
            onMouseEnter={() => {
              if (hoverTimeoutRef.current !== null) {
                window.clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = null;
              }
              if (collapsedHoverItem) {
                setExpandedMenu(collapsedHoverItem.name);
                setCollapsedHoverItem(collapsedHoverItem);
              }
            }}
            onMouseLeave={() => {
              if (hoverTimeoutRef.current !== null) {
                window.clearTimeout(hoverTimeoutRef.current);
              }
              hoverTimeoutRef.current = window.setTimeout(() => {
                setExpandedMenu(null);
                setCollapsedFlyoutPos(null);
                setCollapsedHoverItem(null);
                hoverTimeoutRef.current = null;
              }, 260);
            }}
          >
            <div className="py-2">
              {collapsedHoverItem.subItems.map((sub, i) => {
                const SubIcon = sub.icon;
                const isSubActive = pathname === sub.path;

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      router.push(sub.path);
                      setOpen(false);
                      setExpandedMenu(null);
                      setCollapsedHoverItem(null);
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                      isSubActive
                        ? "bg-yellow-50 text-yellow-800"
                        : "text-gray-700 hover:bg-yellow-50/70"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <SubIcon
                        className={`w-4 h-4 ${
                          isSubActive ? "text-yellow-600" : "text-gray-400"
                        }`}
                      />
                      <span>{sub.name}</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-yellow-500" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
    </>
  );
}
