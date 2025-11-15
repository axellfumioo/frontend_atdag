"use client";

import React, { useState } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  ArrowUpDown,
  Tag,
  Pencil,
  Trash2,
} from "lucide-react";

const STATUS_DATA = [
  {
    order: 1,
    name: "Lead Generation",
    color: "#6F42C1",
    colorBg: "bg-[#6F42C1]",
    statusType: "Open",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 2,
    name: "Initial Contact",
    color: "#17A2B8",
    colorBg: "bg-[#17A2B8]",
    statusType: "Open",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 3,
    name: "Under Review",
    color: "#FFC107",
    colorBg: "bg-[#FFC107]",
    statusType: "Open",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 4,
    name: "Pitch Scheduled",
    color: "#FD7E14",
    colorBg: "bg-[#FD7E14]",
    statusType: "Open",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 5,
    name: "Due Diligence",
    color: "#007BFF",
    colorBg: "bg-[#007BFF]",
    statusType: "Open",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 6,
    name: "Term Negotiation",
    color: "#20C997",
    colorBg: "bg-[#20C997]",
    statusType: "Open",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 7,
    name: "Legal Review",
    color: "#E83E8C",
    colorBg: "bg-[#E83E8C]",
    statusType: "Open",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
];

export default function InvestmentStatusPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = STATUS_DATA.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <Tag className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Investment Status</h1>
            <p className="text-gray-600 text-sm">
              Configure investment status categories with colors (Hot/Warm/Cold prospects, etc.).
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search statuses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Status</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <button className="flex items-center space-x-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900">
                    <span>Order</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status Name
                  </span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Color
                  </span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status Type
                  </span>
                </th>
                <th className="px-6 py-3 text-left">
                  <button className="flex items-center space-x-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900">
                    <span>Date Created</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button className="flex items-center space-x-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900">
                    <span>Date Updated</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.order} className="border-b border-gray-100 last:border-0">
                  <td className="px-6 py-3 text-sm text-gray-700">{item.order}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${item.colorBg}`}
                      />
                      <span className="text-sm text-gray-800">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm font-mono text-gray-700">
                    {item.color}
                  </td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {item.statusType}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {item.dateCreated}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {item.dateUpdated}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-700">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded border border-gray-200 hover:bg-red-50 text-red-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td className="px-6 py-10 text-center text-sm text-gray-400" colSpan={7}>
                    No statuses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
