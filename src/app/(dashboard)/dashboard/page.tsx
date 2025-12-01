"use client";

import { Users, LineChart, BarChart3, Clock3 } from "lucide-react";
import { useMemo } from "react";

import { useQuery } from "@tanstack/react-query";
import { investmentService } from "@/services/InvestmentService";
import { investorService } from "@/services/InvestorService";
import { InvestmentStatusChart } from "@/components/InvestmentStatusChart";
import { chartService } from "@/services/ChartService";
import { InvestmentCurrencyChart } from "@/components/InvestmentCurrencyChart";
import { convertToIDR } from "@/common/lib/idrConverter";
import { useSidebarLayout } from "@/components/LayoutClient";
import { userService } from "@/services/UserService";
import { useStore } from "@tanstack/react-store";
import { userStore } from "@/common/stores/user";

export default function DashboardStats() {
  const { sidebarCollapsed } = useSidebarLayout();
  const containerWidthClass = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed],
  );
  // Fetch investors
  const { data: totalInvestors } = useQuery({
    queryKey: ["dashboardInvestors"],
    queryFn: () => investorService.getAllInvestorsTotal(),
  });

  // Fetch pengguna
  const {data: totalUsers} = useQuery({
    queryKey: ["dashboardPengguna"],
    queryFn: () => userService.getAllUsersTotal(),
  })

  // Fetch investment open
  const { data: openInvestment } = useQuery({
    queryKey: ["dashboardTotalInvestmentOpen"],
    queryFn: () => investmentService.getAllInvestmentOpen(),
  });

  // Total investment amount
  const { data: investmentAmount } = useQuery({
    queryKey: ["investmentAmount"],
    queryFn: () => investmentService.getInvestmentAmount(),
  });

  // Total investors count
  // const totalInvestors = investors ? investors.length : 0;

  const statsCards = [
    {
      title: "Total Investor",
      value: (totalInvestors ?? 0).toString(),
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
        {
      title: "Total Pengguna",
      value: (totalUsers ?? 0).toString(),
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      title: "Total Nilai Investasi",
      value: convertToIDR((investmentAmount as string) || "0"),
      icon: BarChart3,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    // {
    //   title: "Total Contacts",
    //   value: "0",
    //   icon: Contact2,
    //   iconBg: "bg-emerald-50",
    //   iconColor: "text-emerald-500",
    // },
    // {
    //   title: "WhatsApp Groups",
    //   value: "0",
    //   icon: MessageCircle,
    //   iconBg: "bg-green-50",
    //   iconColor: "text-green-500",
    // },
    {
      title: "Investasi Aktif",
      value: openInvestment ?? 0,
      icon: LineChart,
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-500",
    },
    // {
    //   title: "Broadcast Groups",
    //   value: "0",
    //   icon: Radio,
    //   iconBg: "bg-indigo-50",
    //   iconColor: "text-indigo-500",
    // },
    // {
    //   title: "Message Templates",
    //   value: "0",
    //   icon: MessageSquare,
    //   iconBg: "bg-pink-50",
    //   iconColor: "text-pink-500",
    // },
    // {
    //   title: "Active Campaigns",
    //   value: "0",
    //   icon: Zap,
    //   iconBg: "bg-red-50",
    //   iconColor: "text-red-500",
    // },
  ];

  const { data: investmentStatusChart } = useQuery({
    queryKey: ["investmentStatusChart"],
    queryFn: () => chartService.getChartInvestmentPerStatus(),
  });

  const { data: investmentCurrencyChart } = useQuery({
    queryKey: ["investmentCurrencyChart"],
    queryFn: () => chartService.getChartInvestmentPerCurrency(),
  });

  

  return (
    <div className="min-h-full bg-linear-to-b from-yellow-50/40 via-white to-white px-4 py-1">

      <div className={`${containerWidthClass} mx-auto space-y-6`}>
        {/* Header */}
        <section className="rounded-2xl border border-yellow-100 bg-white/95 px-5 py-4 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center">
                <Clock3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  Dashboard
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Ringkasan singkat performa investasi dan aktivitas terbaru.
                </p>
              </div>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-yellow-100 bg-white/70 px-3 py-1 text-xs font-medium text-gray-600">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]" />
              Data tersinkronisasi
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-yellow-100 bg-white px-4 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-yellow-300 hover:shadow-md"
              >
                <div className="relative flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
                      {card.title}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {card.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border border-yellow-100 bg-yellow-50/80 shadow-sm ${card.iconBg}`}
                  >
                    <Icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Charts Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-1">
            <InvestmentStatusChart data={investmentStatusChart ?? []} />

            <InvestmentCurrencyChart data={investmentCurrencyChart ?? []} />
        </section>
      </div>
    </div>
  );
}
