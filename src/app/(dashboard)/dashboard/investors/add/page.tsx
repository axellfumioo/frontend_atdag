"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserCircle } from "lucide-react";

export default function AddInvestorPage() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/dashboard/investors")}
        className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Back to Investors</span>
      </button>

      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-yellow-500 rounded-md flex items-center justify-center">
          <UserCircle className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Add Investor</h1>
      </div>

      {/* Card */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Investor Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm 
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Website */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Website</label>
              <input
                type="text"
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm 
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Investor Type */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Investor Type ID</label>
              <input
                type="number"
                placeholder="e.g. 1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm 
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/investors")}
              className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm bg-yellow-500 text-white rounded-lg 
              hover:bg-yellow-600"
            >
              Save Investor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}