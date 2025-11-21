"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BarChart2, Calendar, Loader2Icon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { investmentStageService } from "@/services/InvestmentStageService";
import { currencyService } from "@/services/CurrencyService";
import { investmentStatusService } from "@/services/InvestmentStatusService";
import { investmentService } from "@/services/InvestmentService";
import { investorService } from "@/services/InvestorService";
import { useForm } from "@tanstack/react-form";
import { createInvesmentnValidation } from "@/common/validation/investmentSchema";
import FieldInfo from "@/components/FieldInfo";
import { toast } from "sonner";

export default function AddInvestmentPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: stages } = useQuery({
    queryKey: ["investmentStages"],
    queryFn: () => investmentStageService.getInvestmentStages(),
  });

  const { data: currencies } = useQuery({
    queryKey: ["currencies"],
    queryFn: () => currencyService.getAllCurrencies(),
  });

  const { data: status } = useQuery({
    queryKey: ["investmentStatus"],
    queryFn: () => investmentStatusService.getAllInvestmentStatus(),
  });

  const { data: investores } = useQuery({
    queryKey: ["investor"],
    queryFn: () => investorService.getAllInvestors(),
  });

  const { mutate: createInvestment, isPending: isLoadingCreateInvestment } =
    useMutation({
      mutationKey: ["createInvestment"],
      mutationFn: investmentService.createInvestment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["investments"] });
        toast.success("Successffully Created Investment");
        router.push("/dashboard/investments");
      },
      onError: () => toast.error("Failed Created Investment"),
    });

  const form = useForm({
    defaultValues: {
      name: "",
      investor_id: 0,
      investment_stage_id: 0,
      investment_status_id: 0,
      currency_id: 0,
      value: "",
      description: "",
      expected_closing_date: "",
      actual_closing_date: "",
    },
    validators: {
      onChange: createInvesmentnValidation,
    },
    onSubmit: async ({ value }) => {
      createInvestment({
        name: value.name,
        investor_id: value.investor_id,
        investment_stage_id: value.investment_stage_id,
        investment_status_id: value.investment_status_id,
        currency_id: value.currency_id,
        value: value.value,
        description: value.description,
        expected_closing_date: new Date(value.expected_closing_date),
        actual_closing_date: new Date(value.actual_closing_date),
      });
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <button
        type="button"
        onClick={() => router.push("/dashboard/investments")}
        className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Back to Investments</span>
      </button>

      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
          <BarChart2 className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Add Investment</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <form.Field name="name">
              {(field) => {
                return (
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Investment Name
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value || ""}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Enter investment name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </form.Field>

            {/* Investor */}
            <form.Field name="investor_id">
              {(field) => {
                return (
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Investor
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value || 0}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    >
                      <option value={0}>Select an investor</option>
                      {investores?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </form.Field>

            {/* Stage */}
            <form.Field name="investment_stage_id">
              {(field) => {
                return (
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Investment Stage
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value || 0}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    >
                      <option value={0}>Select stage</option>
                      {stages?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </form.Field>

            {/* Status */}
            <form.Field name="investment_status_id">
              {(field) => {
                return (
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Investment Status
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value || 0}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    >
                      <option value={0}>Select status</option>
                      {status?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.status_name}
                        </option>
                      ))}
                    </select>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </form.Field>

            {/* Currency */}
            <form.Field name="currency_id">
              {(field) => {
                return (
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Currency
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value || 0}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      required
                    >
                      <option value={0}>Select currency</option>
                      {currencies?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name || item.code}
                        </option>
                      ))}
                    </select>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </form.Field>

            {/* Value */}
            <form.Field name="value">
              {(field) => {
                return (
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Investment Value
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="Enter value"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-yellow-500"
                      required
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </form.Field>

            {/* Expected Date */}
            <form.Field name="expected_closing_date">
              {(field) => {
                return (
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Expected Closing Date
                    </label>
                    <div className="relative">
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value || ""}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm pr-10 focus:ring-2 focus:ring-yellow-500"
                        required
                      />
                      <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </form.Field>

            {/* Actual Date */}
            <form.Field name="actual_closing_date">
              {(field) => {
                return (
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Actual Closing Date
                    </label>
                    <div className="relative">
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value || ""}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm pr-10 focus:ring-2 focus:ring-yellow-500"
                        required
                      />
                      <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </form.Field>
          </div>

          {/* Description */}
          <form.Field name="description">
            {(field) => {
              return (
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value || ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    rows={4}
                    maxLength={500}
                    placeholder="Enter description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-yellow-500"
                  />
                  <div className="text-xs text-gray-400 text-right">
                    {(field.state.value || "").length} / 500
                  </div>
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>

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
