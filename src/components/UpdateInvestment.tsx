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

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  investment: Investment;
}

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
  const [currencyId, setCurrencyId] = useState(investment.currency_id);

  // Date fields
  const [expected, setExpected] = useState(
    investment.expected_closing_date ?? ""
  );
  const [closing, setClosing] = useState(investment.closing_date ?? "");

  const queryClient = useQueryClient();

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

  const { mutate: updateInvestment } = useMutation({
    mutationKey: ["updateInvestment"],
    mutationFn: () =>
      investmentService.updateInvestment({
        investment_id: investment.investment_id,
        name,
        value,
        description: investment.description,
        investor_id: investorId,
        investment_stage_id: stageId,
        investment_status_id: statusId,
        currency_id: currencyId,
        expected_closing_date: new Date(expected),
        actual_closing_date: new Date(closing),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
      toast.success("Investment updated successfully!");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to update investment");
    },
  });

  function handleSubmit() {
    updateInvestment();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Investment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* NAME */}
          <div>
            <label className="block font-medium mb-1">Investment Name</label>
            <input
              title="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* VALUE */}
          <div>
            <label className="block font-medium mb-1">Value</label>
            <input
              title="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* INVESTOR */}
          <div className="grid grid-cols-2 w-full gap-2">
            <div>
              <label className="block font-medium mb-1">Investor</label>
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

            {/* STAGE */}
            <div>
              <label className="block font-medium mb-1">Stage</label>
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

            {/* STATUS */}
            <div>
              <label className="block font-medium mb-1">Status</label>
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

            {/* CURRENCY */}
            <div>
              <label className="block font-medium mb-1">Currency</label>
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
          </div>
          {/* EXPECTED CLOSING DATE */}
          <div>
            <label className="block font-medium mb-1">
              Expected Closing Date
            </label>
            <input
              title="expect-date"
              type="date"
              value={expected ? expected.substring(0, 10) : ""}
              onChange={(e) =>
                setExpected(new Date(e.target.value).toISOString())
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* ACTUAL CLOSING DATE */}
          <div>
            <label className="block font-medium mb-1">Closing Date</label>
            <input
              title="actual-date"
              type="date"
              value={closing ? closing.substring(0, 10) : ""}
              onChange={(e) =>
                setClosing(new Date(e.target.value).toISOString())
              }
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
