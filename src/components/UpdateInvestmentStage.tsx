"use client";

import React from "react";
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
import { updateInvestmentstageValidation } from "@/common/validation/investmentstageSchema";
import FieldInfo from "./FieldInfo";
import { UpdateInvestmentStage } from "@/common/dto/investmentStage.dto";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  investmentStage: InvestmentStage;
}

// 🚨 RENAME COMPONENT AGAR TIDAK BENTROK DENGAN INTERFACE UpdateInvestmentStage
export default function UpdateInvestmentStageDialog({
  isOpen,
  setIsOpen,
  investmentStage,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate: updateStage, isPending } = useMutation({
    mutationKey: ["updateStage"],
    mutationFn: (payload: { id: number; data: UpdateInvestmentStage }) =>
      investmentStageService.updateInvestmentStage(payload.id, payload.data),

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
    defaultValues: {
      order: investmentStage.order,
      name: investmentStage.name,
    },
    validators: {
      onChange: updateInvestmentstageValidation,
    },
    onSubmit: async ({ value }) => {
      updateStage({
        id: investmentStage.id,
        data: {
          order: value.order,
          name: value.name,
        },
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Investment Stage</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4 mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          {/* ORDER FIELD */}
          <form.Field name="order">
            {(field) => (
              <div>
                <label htmlFor={field.name} className="block font-medium mb-1">
                  Order
                </label>

                <input
                  id={field.name}
                  name={field.name}
                  type="number"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  className="w-full border rounded px-3 py-2"
                  placeholder="1"
                />

                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          {/* NAME FIELD */}
          <form.Field name="name">
            {(field) => (
              <div>
                <label htmlFor={field.name} className="block font-medium mb-1">
                  Stage Name
                </label>

                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  placeholder="e.g. Seed Stage"
                />

                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          {/* BUTTONS */}
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}