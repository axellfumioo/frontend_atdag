"use client";

import {
  Users,
  Contact2,
  MessageCircle,
  LineChart,
  BarChart3,
  Radio,
  MessageSquare,
  Zap,
  Clock3,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { investmentService } from "@/services/InvestmentService";
import { investorService } from "@/services/InvestorService";

export default function DashboardStats() {
  // Fetch investments
    const {data: totalInvestment} = useQuery({
    queryKey: ["dashboardTotalInvestment"],
    queryFn: () => investmentService.getAllInvestmentsTotal()
  })

  // Fetch investors
  const { data: totalInvestors } = useQuery({
    queryKey: ["dashboardInvestors"],
    queryFn: () => investorService.getAllInvestorsTotal(),
  });

  // Fetch investment open
     const {data: openInvestment} = useQuery({
    queryKey: ["dashboardTotalInvestment"],
    queryFn: () => investmentService.getAllInvestmentOpen()
  })


  // Total investment amount
  // const totalInvestmentAmount = investment ? investment.length :0;

  // Total investors count
  // const totalInvestors = investors ? investors.length : 0;
  
  const statsCards = [
    {
      title: "Total Investors",
      value: (totalInvestors ?? 0).toString(),
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      title: "Investment Amount",
      value: (totalInvestment ?? 0).toLocaleString("id-ID"),
      icon: BarChart3,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      title: "Total Contacts",
      value: "0",
      icon: Contact2,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
    {
      title: "WhatsApp Groups",
      value: "0",
      icon: MessageCircle,
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      title: "Open Investments",
      value: (openInvestment ?? 0).toLocaleString("id-ID"),
      icon: LineChart,
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-500",
    },
    {
      title: "Broadcast Groups",
      value: "0",
      icon: Radio,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-500",
    },
    {
      title: "Message Templates",
      value: "0",
      icon: MessageSquare,
      iconBg: "bg-pink-50",
      iconColor: "text-pink-500",
    },
    {
      title: "Active Campaigns",
      value: "0",
      icon: Zap,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded bg-yellow-500 flex items-center justify-center">
            <Clock3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Welcome back! Here&apos;s what&apos;s happening with your investments.
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
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)] min-h-[260px]">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">
            Investment Status Distribution
          </h2>

          <div className="h-full rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-400 bg-gray-50/40">
            Chart placeholder
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)] min-h-[260px]">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">
            Investment Status Pipeline
          </h2>

          <div className="h-full rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-400 bg-gray-50/40">
            Chart placeholder
          </div>
        </div>
      </div>
    </div>
  );
}