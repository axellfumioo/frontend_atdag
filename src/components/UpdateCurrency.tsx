"use client";

import React, { useState } from "react";
import { Button } from "@/common/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/shadcn/ui/dialog";
import { Currency } from "@/common/model";
import { currencyService } from "@/services/CurrencyService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currency: Currency;
}

export default function UpdateCurrency({ isOpen, setIsOpen, currency }: Props) {
  const [code, setCode] = useState(currency.code);
  const [name, setName] = useState(currency.name);
  const [order, setOrder] = useState(currency.order);
  const [symbol, setSymbol] = useState(currency.symbol);

  const queryClient = useQueryClient();

  const { mutate: updateCurrency } = useMutation({
    mutationKey: ["updateCurrency"],
    mutationFn: () =>
      currencyService.updateCurrency(currency.id, {
        code,
        name,
        order,
        symbol,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currencies"],
      });
      toast.success("Currency updated successfully!");
      setIsOpen(false);
    },
    onError: (err: any) => {
      toast.error("Failed to update currency");
    },
  });

  function handleSubmit() {
    updateCurrency();
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Currency</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label htmlFor="code" className="block font-medium mb-1">
              Currency Code
            </label>
            <input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. USD"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Currency Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. US Dollar"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="order" className="block font-medium mb-1">
              Order
            </label>
            <input
              id="order"
              type="number"
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              placeholder="1"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="symbol" className="block font-medium mb-1">
              Symbol
            </label>
            <input
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="e.g. $"
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
