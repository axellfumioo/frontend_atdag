import React from "react";
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

const statsCards = [
  {
    title: "Total Investors",
    value: "0",
    icon: Users,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
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
    value: "0",
    icon: LineChart,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-500",
  },
  {
    title: "Investment Amount",
    value: "0",
    icon: BarChart3,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
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

export default function DashboardPage() {
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

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)]"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {card.title}
                </p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)] min-h-[260px]">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">
            Investment Status Distribution
          </h2>
          <div className="h-full rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-400 bg-gray-50/40">
            Chart placeholder
          </div>
        </div>

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
