"use client";

import React, { useState } from "react";
import { Button } from "@/common/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/shadcn/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { investmentStageService } from "@/services/InvestmentStageService";
import { InvestmentStage } from "@/common/model";
import { useForm } from "@tanstack/react-form";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  investmentStage: InvestmentStage;
}

export default function UpdateInvestmentStage({
  isOpen,
  setIsOpen,
  investmentStage,
}: Props) {
  const [order, setOrder] = useState(investmentStage.order);
  const [name, setName] = useState(investmentStage.name);

  const queryClient = useQueryClient();

  const { mutate: updateStage } = useMutation({
    mutationKey: ["updateStage"],
    mutationFn: () =>
      investmentStageService.updateInvestmentStage(investmentStage.id, {
        order,
        name,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investmentStages"] });
      toast.success("Investment stage updated successfully!");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to update investment stage");
    },
  });

  const form = useForm({
    defaultValues: {},
  });

  const handleSubmit = () => {
    updateStage();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Investment Stage</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
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
            <label htmlFor="name" className="block font-medium mb-1">
              Stage Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Seed Stage"
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
