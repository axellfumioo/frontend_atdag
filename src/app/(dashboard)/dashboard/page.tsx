"use client";

import { Users, LineChart, BarChart3, Clock3 } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { investmentService } from "@/services/InvestmentService";
import { investorService } from "@/services/InvestorService";
import { InvestmentStatusChart } from "@/components/InvestmentStatusChart";
import { chartService } from "@/services/ChartService";
import { InvestmentCurrencyChart } from "@/components/InvestmentCurrencyChart";
import { convertToIDR } from "@/common/lib/idrConverter";

export default function DashboardStats() {
  // Fetch investors
  const { data: totalInvestors } = useQuery({
    queryKey: ["dashboardInvestors"],
    queryFn: () => investorService.getAllInvestorsTotal(),
  });

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
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded bg-yellow-500 flex items-center justify-center">
            <Clock3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dasbor</h1>
            <p className="text-sm text-gray-500 mt-1">
              Selamat datang kembali! Berikut ringkasan terbaru dari investasi kamu.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 shadow-sm"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.iconBg}`}
              >
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {card.title}
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {card.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Chart 1 */}
        <InvestmentStatusChart data={investmentStatusChart ?? []} />

        {/* Chart 2 */}
        <InvestmentCurrencyChart data={investmentCurrencyChart ?? []} />
      </div>
    </div>
  );
}
