"use client";

import React, { useState } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  ArrowUpDown,
  CircleDollarSign,
  Pencil,
  Trash2,
} from "lucide-react";

const CURRENCIES_DATA = [
  {
    order: 1,
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 2,
    code: "EUR",
    symbol: "€",
    name: "Euro",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 3,
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 4,
    code: "JPY",
    symbol: "¥",
    name: "Japanese Yen",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 5,
    code: "IDR",
    symbol: "Rp",
    name: "Indonesian Rupiah",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 6,
    code: "SGD",
    symbol: "S$",
    name: "Singapore Dollar",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
  {
    order: 7,
    code: "MYR",
    symbol: "RM",
    name: "Malaysian Ringgit",
    dateCreated: "02 Oct 2025",
    dateUpdated: "02 Oct 2025",
  },
];

export default function CurrenciesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = CURRENCIES_DATA.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.code.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q) ||
      item.symbol.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
            <CircleDollarSign className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Currencies</h1>
            <p className="text-gray-600 text-sm">
              Manage currencies used for investments and financial tracking.
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
              placeholder="Search currencies..."
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
              <span>Add Currency</span>
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
                    Code
                  </span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Symbol
                  </span>
                </th>
                <th className="px-6 py-3 text-left">
                  <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Name
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
                  <td className="px-6 py-3 text-sm font-semibold text-gray-800">
                    {item.code}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {item.symbol}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">
                    {item.name}
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
                  <td
                    className="px-6 py-10 text-center text-sm text-gray-400"
                    colSpan={7}
                  >
                    No currencies found.
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
