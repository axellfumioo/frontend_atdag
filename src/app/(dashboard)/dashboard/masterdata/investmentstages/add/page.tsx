"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BarChart2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { investmentStageService } from "@/services/InvestmentStageService";
import { toast } from "sonner";

export default function AddInvestmentStagePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [order, setOrder] = useState<number | "">("");
  const queryClient = useQueryClient();

  const { mutate: createInvestmentStage, isPending: isCreating } = useMutation({
    mutationKey: ["createInvestmentStage"],
    mutationFn: investmentStageService.createInvestmentStage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["investmentStages"],
      });
      toast.success("Investment Stage created successfully!");
      router.push("/dashboard/masterdata/investmentstages");
    },
    onError: (err: any) => {
      toast.error("Failed to create Investment Stage");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createInvestmentStage({ name, order: Number(order) });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
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
        <h1 className="text-3xl font-bold text-gray-900">
          Add Investment Stage
        </h1>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Stage Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Stage Name
            </label>
            <input
              type="text"
              placeholder="Enter stage name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Stage Order */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Stage Order
            </label>
            <input
              type="number"
              placeholder="Enter stage order"
              value={order}
              onChange={(e) =>
                setOrder(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
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
              Save Stage
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
