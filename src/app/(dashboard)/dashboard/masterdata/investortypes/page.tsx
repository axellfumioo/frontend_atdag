"use client";

import React, { useState } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  ArrowUpDown,
  UserCircle2,
  Pencil,
  Trash2,
} from "lucide-react";

const INVESTOR_TYPES_DATA = [
  {
    order: 1,
    name: "Angel Investor",
    color: "#6F42C1",
    colorBg: "bg-[#6F42C1]",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 2,
    name: "VC Fund",
    color: "#FD7E14",
    colorBg: "bg-[#FD7E14]",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 3,
    name: "Private Equity",
    color: "#20C997",
    colorBg: "bg-[#20C997]",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 4,
    name: "Corporate VC",
    color: "#E83E8C",
    colorBg: "bg-[#E83E8C]",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 5,
    name: "Family Office",
    color: "#007BFF",
    colorBg: "bg-[#007BFF]",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 6,
    name: "Government Fund",
    color: "#198754",
    colorBg: "bg-[#198754]",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 7,
    name: "Accelerator",
    color: "#DC3545",
    colorBg: "bg-[#DC3545]",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
];

export default function InvestorTypesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = INVESTOR_TYPES_DATA.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
            <UserCircle2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Investor Types</h1>
            <p className="text-gray-600 text-sm">
              Configure investor type categories with colors (Angel, VC, Private Equity, etc.).
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
              placeholder="Search types..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Type</span>
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
                    Type Name
                  </span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Color
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
                  <td className="px-6 py-10 text-center text-sm text-gray-400" colSpan={6}>
                    No investor types found.
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
