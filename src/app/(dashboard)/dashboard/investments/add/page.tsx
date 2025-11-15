"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BarChart2, Calendar } from "lucide-react";

export default function AddInvestmentPage() {
  const router = useRouter();
  const [description, setDescription] = useState("");

  const maxDescriptionLength = 500;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/dashboard/investments")}
        className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
     >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Back to Investments</span>
      </button>

      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
          <BarChart2 className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Investment</h1>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form className="space-y-6">
          {/* 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Investment Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Investment Name
              </label>
              <input
                type="text"
                placeholder="Enter investment name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Investor */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Investor
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                <option value="">Select an investor</option>
              </select>
            </div>

            {/* Investment Stage */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Investment Stage
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                <option value="">Select investment stage</option>
              </select>
            </div>

            {/* Investment Status */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Investment Status
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                <option value="">Select investment status</option>
              </select>
            </div>

            {/* Currency */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                <option value="">Select currency</option>
              </select>
            </div>

            {/* Investment Value */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Investment Value
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Enter investment value"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Expected Closing Date */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Expected Closing Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Actual Closing Date */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Actual Closing Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              maxLength={maxDescriptionLength}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter investment description (optional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-y min-h-[120px]"
            />
            <div className="mt-1 text-xs text-gray-400 text-right">
              {description.length} / {maxDescriptionLength}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/dashboard/investments")}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Save Investment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
