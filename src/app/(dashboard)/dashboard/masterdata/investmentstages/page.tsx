"use client";

import React, { useState } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  ArrowUpDown,
  Layers,
  Pencil,
  Trash2,
} from "lucide-react";

type InvestmentStage = {
  order: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const investmentStages: InvestmentStage[] = [
  {
    order: 1,
    name: "Pre-Seed",
    createdAt: "02 Oct 2025",
    updatedAt: "02 Oct 2025",
  },
  {
    order: 2,
    name: "Seed",
    createdAt: "02 Oct 2025",
    updatedAt: "02 Oct 2025",
  },
  {
    order: 3,
    name: "Series A",
    createdAt: "02 Oct 2025",
    updatedAt: "02 Oct 2025",
  },
  {
    order: 4,
    name: "Series B",
    createdAt: "02 Oct 2025",
    updatedAt: "02 Oct 2025",
  },
  {
    order: 5,
    name: "Series C",
    createdAt: "02 Oct 2025",
    updatedAt: "02 Oct 2025",
  },
  {
    order: 6,
    name: "Series D+",
    createdAt: "02 Oct 2025",
    updatedAt: "02 Oct 2025",
  },
  {
    order: 7,
    name: "Bridge Round",
    createdAt: "02 Oct 2025",
    updatedAt: "02 Oct 2025",
  },
  {
    order: 8,
    name: "Pre-IPO",
    createdAt: "02 Oct 2025",
    updatedAt: "02 Oct 2025",
  },
  {
    order: 9,
    name: "IPO",
    createdAt: "02 Oct 2025",
    updatedAt: "02 Oct 2025",
  },
  {
    order: 10,
    name: "Post-IPO",
    createdAt: "02 Oct 2025",
    updatedAt: "02 Oct 2025",
  },
  {
    order: 11,
    name: "Post-IPO",
    createdAt: "02 Oct 2025",
    updatedAt: "02 Oct 2025",
  },
];

export default function InvestmentStagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStages = investmentStages.filter((stage) =>
    stage.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredStages.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedStages = filteredStages.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Investment Stages</h1>
            <p className="text-gray-600">
              Configure investment stages in sequential order (Pre-Seed, Seed,
              Series A, etc.).
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search stages..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="flex gap-3">
              <button className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
              <button className="flex items-center space-x-2 rounded-lg bg-yellow-500 px-4 py-2 text-sm text-white hover:bg-yellow-600">
                <Plus className="h-4 w-4" />
                <span>Add Stage</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  <button className="flex items-center space-x-1 hover:text-gray-900">
                    <span>Order</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  <button className="flex items-center space-x-1 hover:text-gray-900">
                    <span>Stage Name</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  <button className="flex items-center space-x-1 hover:text-gray-900">
                    <span>Date Created</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  <button className="flex items-center space-x-1 hover:text-gray-900">
                    <span>Date Updated</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStages.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-sm text-gray-400"
                  >
                    No stages found.
                  </td>
                </tr>
              ) : (
                paginatedStages.map((stage) => (
                  <tr
                    key={stage.order}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {stage.order}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {stage.name}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700">
                      {stage.createdAt}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700">
                      {stage.updatedAt}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <button className="rounded border border-gray-200 p-1 text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button className="rounded border border-gray-200 p-1 text-red-500 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filteredStages.length > pageSize && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 text-sm text-gray-600">
            <div>
              Showing {filteredStages.length === 0 ? 0 : startIndex + 1} -
              {" "}
              {Math.min(startIndex + pageSize, filteredStages.length)} of
              {" "}
              {filteredStages.length} stages
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
