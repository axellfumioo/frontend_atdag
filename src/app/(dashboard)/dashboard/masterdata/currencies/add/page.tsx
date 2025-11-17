"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Wallet } from "lucide-react";
import api from "@/common/lib/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { currencyService } from "@/services/CurrencyService";
import { toast } from "sonner";

export default function AddCurrencyPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [code, setCode] = useState("");
  const [order, setOrder] = useState<number | string>("");
  const queryClient = useQueryClient();

  const { mutate: createCurrency, isPending: isCreating } = useMutation({
    mutationKey: ["createCurrency"],
    mutationFn: currencyService.createCurrency,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currencies"],
      });
      toast.success("Currency created successfully!");
      router.push("/dashboard/masterdata/currencies");
    },
    onError: (err: any) => {
      toast.error("Failed to create currency");
    },
  });


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      name,
      symbol,
      code,
      currency_order: Number(order),
    };
    createCurrency({
      name: payload.name,
      symbol: payload.symbol,
      code: payload.code,
      order: payload.currency_order,
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/dashboard/currencies")}
        className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Back to Currencies</span>
      </button>

      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-yellow-500 rounded-md flex items-center justify-center">
          <Wallet className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Add Currency</h1>
      </div>

      {/* FULL CARD */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="e.g. Indonesian Rupiah"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm 
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>

            {/* Symbol */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Symbol
              </label>
              <input
                type="text"
                placeholder="e.g. Rp"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm 
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>

            {/* Code */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Code</label>
              <input
                type="text"
                placeholder="e.g. IDR"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm uppercase
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>

            {/* Order */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Order</label>
              <input
                type="number"
                placeholder="e.g. 1"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm 
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/masterdata/currencies")}
              className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-5 py-2.5 text-sm bg-yellow-500 text-white rounded-lg 
              hover:bg-yellow-600 disabled:opacity-50"
            >
              {isCreating ? "Saving..." : "Save Currency"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
