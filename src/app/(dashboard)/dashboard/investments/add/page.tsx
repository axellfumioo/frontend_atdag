"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BarChart2, Calendar, Loader2Icon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { investmentStageService } from "@/services/InvestmentStageService";
import { currencyService } from "@/services/CurrencyService";
import { investmentStatusService } from "@/services/InvestmentStatusService";
import { investmentService } from "@/services/InvestmentService";
import { CreateInvestmentDto } from "@/common/dto/investment.dto";
import { investorService } from "@/services/InvestorService";
import { toast } from "sonner";

export default function AddInvestmentPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const maxDescriptionLength = 500;

  // Input state
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [investorId, setInvestorId] = useState<number>();
  const [stageId, setStageId] = useState<number>();
  const [statusId, setStatusId] = useState<number>();
  const [currencyId, setCurrencyId] = useState<number>();
  const [expectClosingDate, setExpectClosingDate] = useState<Date>();
  const [actualClosingDate, setActualClosingDate] = useState<Date>();

  const { data: stages, isLoading: isLoadingStages } = useQuery({
    queryKey: ["investmentStages"],
    queryFn: () => investmentStageService.getInvestmentStages(1),
  });

  const { data: currencies, isLoading: isLoadingCurrencies } = useQuery({
    queryKey: ["currencies"],
    queryFn: () => currencyService.getAllCurrencies(1, 100),
  });

  const { data: status, isLoading: isLoadingStatus } = useQuery({
    queryKey: ["investmentStatus"],
    queryFn: () => investmentStatusService.getAllInvestmentStatus(1, 100),
  });

  const { data: investores, isLoading: isLoadingInvestores } = useQuery({
    queryKey: ["investor"],
    queryFn: () => investorService.getAllInvestors(1, 100),
  });

  const { mutate: createInvestment, isPending: isLoadingCreateInvestment } =
    useMutation({
      mutationKey: ["createInvestment"],
      mutationFn: (dto: CreateInvestmentDto) => investmentService.createInvestmentType(dto),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["investments"] });
        toast.success("Berhasil membuat investment");
      },
      onError: () => {
        toast.error("Gagal membuat investment");
      },
    });

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createInvestment({
              name,
              value,
              description,
              currency_id: currencyId!,
              investment_stage_id: stageId!,
              investor_id: investorId!,
              investment_status_id: statusId!,
              actual_closing_date: actualClosingDate!,
              expected_closing_date: expectClosingDate!,
            });
          }}
          className="space-y-6"
        >
          {/* 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Investment Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Investment Name
              </label>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Enter investment name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
              />
            </div>

            {/* Investor */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Investor
              </label>
              <select
                title="investor"
                defaultValue={""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
                onChange={(e) => {
                  setInvestorId(Number(e.target.value));
                }}
              >
                <option value="">Select an investor</option>
                {investores?.length! > 0 &&
                  investores?.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            {/* Investment Stage */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Investment Stage
              </label>
              <select
                title="stage"
                defaultValue={""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
                onChange={(e) => {
                  setStageId(Number(e.target.value));
                }}
              >
                <option value="">Select investment stage</option>
                {stages?.length! > 0 &&
                  stages?.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            {/* Investment Status */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Investment Status
              </label>
              <select
                title="investment-status"
                defaultValue={""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
                onChange={(e) => {
                  setStatusId(Number(e.target.value));
                }}
              >
                <option value="">Select investment status</option>
                {status?.length! > 0 &&
                  status?.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.status_name}
                      </option>
                    );
                  })}
              </select>
            </div>

            {/* Currency */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                title="currency"
                defaultValue={""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
                onChange={(e) => {
                  setCurrencyId(Number(e.target.value));
                }}
              >
                <option value="">Select currency</option>
                {currencies?.length! > 0 &&
                  currencies?.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
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
                  required
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* Expected Closing Date */}
            <div className="flex flex-col">
              <label
                htmlFor="expected-date"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Expected Closing Date
              </label>
              <div className="relative">
                <input
                  id="expected-date"
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                  onChange={(e) => {
                    setExpectClosingDate(new Date(e.target.value));
                  }}
                />
                <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Actual Closing Date */}
            <div className="flex flex-col">
              <label
                htmlFor="closing-date"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Actual Closing Date
              </label>
              <div className="relative">
                <input
                  id="closing-date"
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                  onChange={(e) => {
                    setActualClosingDate(new Date(e.target.value));
                  }}
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
              {isLoadingCreateInvestment ? (
                <Loader2Icon className="w-5 h-5 animate-spin" />
              ) : (
                "Save Investment"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
