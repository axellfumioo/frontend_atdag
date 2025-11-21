"use client";

import React, { useState } from "react";
import { Button } from "@/common/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/shadcn/ui/dialog";
import { Investment } from "@/common/model";
import { investmentService } from "@/services/InvestmentService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { currencyService } from "@/services/CurrencyService";
import { investmentStageService } from "@/services/InvestmentStageService";
import { investmentStatusService } from "@/services/InvestmentStatusService";
import { investorService } from "@/services/InvestorService";
import { useForm } from "@tanstack/react-form";
import { number, object } from "zod";
import { updateInvestmentValidation } from "@/common/validation/investmentSchema";
import FieldInfo from "./FieldInfo";
import { fields } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import { UpdateInvestmentDto } from "@/common/dto/investment.dto";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  investment: Investment;
}

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
};


export default function UpdateInvestment({
  isOpen,
  setIsOpen,
  investment,
}: Props) {
  const [name, setName] = useState(investment.name);
  const [value, setValue] = useState(investment.value);
  const [investorId, setInvestorId] = useState(investment.investor_id);
  const [stageId, setStageId] = useState(investment.investment_stage_id);
  const [statusId, setStatusId] = useState(investment.investment_status_id);

  // Date fields
  const [expected, setExpected] = useState(
    investment.expected_closing_date ?? ""
  );
  const [closing, setClosing] = useState(investment.closing_date ?? "");

  const queryClient = useQueryClient();

  const { data: stages, isLoading: isLoadingStages } = useQuery({
    queryKey: ["investmentStages"],
    queryFn: () => investmentStageService.getInvestmentStages(),
  });

  const { data: currencies, isLoading: isLoadingCurrencies } = useQuery({
    queryKey: ["currencies"],
    queryFn: () => currencyService.getAllCurrencies(),
  });

  const { data: status, isLoading: isLoadingStatus } = useQuery({
    queryKey: ["investmentStatus"],
    queryFn: () => investmentStatusService.getAllInvestmentStatus(),
  });

  const { data: investores, isLoading: isLoadingInvestores } = useQuery({
    queryKey: ["investor"],
    queryFn: () => investorService.getAllInvestors(),
  });

  const { mutate: updateInvestment } = useMutation({
    mutationKey: ["updateInvestment"],
    mutationFn: (dto: UpdateInvestmentDto) =>
      investmentService.updateInvestment(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
      toast.success("Investment Updated Succesfully");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to Updated Investment");
    },
  });

  const form = useForm({
  defaultValues: {
    investment_id: investment.investment_id,
    name: investment.name,

    // harus sama datatype dengan option (number)
    investor_id: Number(investment.investor_id),
    investment_stage_id: Number(investment.investment_stage_id),
    investment_status_id: Number(investment.investment_status_id),
    currency_id: Number(investment.investment_currency_id),

    value: investment.value,
    description: investment.description,

    // HARUS diformat
    expected_closing_date: formatDate(investment.expected_closing_date),
    actual_closing_date: formatDate(investment.closing_date),
  },

    validators: {
      onChange: updateInvestmentValidation,
    },
    onSubmit: async ({ value }) => {
      updateInvestment({
        investment_id: value.investment_id,
        name: value.name,
        investor_id: value.investor_id,
        investment_stage_id: value.investment_stage_id,
        investment_status_id: value.investment_status_id,
        currency_id: value.currency_id,
        value: value.value,
        description: value.description,
        expected_closing_date: new Date(value.expected_closing_date),
        actual_closing_date: new Date(value.actual_closing_date)
      })
    },
  });



  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Investment</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="space-y-4 mt-4">
            {/* NAME */}
            <form.Field name="name">
              {(field) => {
                return (
                  <div>
                    <label className="block font-medium mb-1">
                      Investment Name
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      title="name"
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </form.Field>
            {/* VALUE */}
            <form.Field name="value">
              {(field) => {
                return (
                  <div>
                    <label className="block font-medium mb-1">Value</label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      title="value"
                      type="number"
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </form.Field>
            {/* INVESTOR */}

            <form.Field name="investor_id">
              {(field) => {
                return (
                  <div className="grid grid-cols-2 w-full gap-2">
                    <div>
                      <label className="block font-medium mb-1">Investor</label>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        title="investor"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        required
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                      >
                        <option value="">Select an investor</option>
                        {investores?.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                      <FieldInfo field={field} />
                    </div>

                    {/* STAGE */}
                    <form.Field name="investment_stage_id">
                      {(field) => {
                        return (
                          <div>
                            <label className="block font-medium mb-1">
                              Stage
                            </label>
                            <select
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              title="stage"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              required
                              onChange={(e) =>
                                field.handleChange(Number(e.target.value))
                              }
                            >
                              <option value="">Select investment stage</option>
                              {stages?.map((item) => {
                                return (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                            <FieldInfo field={field} />
                          </div>
                        );
                      }}
                    </form.Field>

                    {/* STATUS */}
                    <form.Field name="investment_status_id">
                      {(field) => {
                        return (
                          <div>
                            <label className="block font-medium mb-1">
                              Status
                            </label>
                            <select
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              title="investment-status"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              required
                                 onChange={(e) =>
                                field.handleChange(Number(e.target.value))
                              }
                            >
                              <option value="">Select investment status</option>
                              {status?.map((item) => {
                                return (
                                  <option key={item.id} value={item.id}>
                                    {item.status_name}
                                  </option>
                                );
                              })}
                            </select>
                            <FieldInfo field={field} />
                          </div>
                        );
                      }}
                    </form.Field>

                    {/* CURRENCY */}
                    <form.Field name="currency_id">
                      {(field) => {
                        return (
                          <div>
                            <label className="block font-medium mb-1">
                              Currency
                            </label>
                            <select
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              title="currency"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              required
                              onChange={(e) =>
                                field.handleChange(Number(e.target.value))
                              }
                            >
                              <option value="">Select currency</option>
                              {currencies?.map((item) => {
                                return (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                );
                              })}
                            </select>
                            <FieldInfo field={field} />
                          </div>
                        );
                      }}
                    </form.Field>
                  </div>
                );
              }}
            </form.Field>

            <div className="grid grid-cols-2 gap-4">
              {/* EXPECTED CLOSING DATE */}
              <form.Field name="expected_closing_date">
                {(field) => {
                  return (
                    <div>
                      <label className="block font-medium mb-1">
                        Expected Closing Date
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        title="expect-date"
                        type="date"
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      />
                      <FieldInfo field={field} />
                    </div>
                  );
                }}
              </form.Field>

              {/* ACTUAL CLOSING DATE */}
              <form.Field name="actual_closing_date">
                {(field) => {
                  return (
                    <div>
                      <label className="block font-medium mb-1">
                        Closing Date
                      </label>
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        title="actual-date"
                        type="date"
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                      />
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
                    <FieldInfo field={field} />
                    <div className="text-xs text-gray-400 text-right">
                      {(field.state.value || "").length} / 500
                    </div>
                  </div>
                );
              }}
            </form.Field>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
