"use client";

import React from "react";
import { Button } from "@/common/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/shadcn/ui/dialog";
import { InvestmentStatus } from "@/common/model";
import { investmentStatusService } from "@/services/InvestmentStatusService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import FieldInfo from "./FieldInfo";
import { updateInvestmentStatusValidation } from "@/common/validation/investmentstatusSchema";
import { updateInvestmentstatusDto } from "@/common/dto/investmentStatus.dto";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  investmentStatus: InvestmentStatus;
}

export default function UpdateInvestmentStatus({
  isOpen,
  setIsOpen,
  investmentStatus,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate: updateStatus, isPending } = useMutation({
    mutationKey: ["investmentStatuses"],
    mutationFn: (dto: updateInvestmentstatusDto) =>
      investmentStatusService.updateInvestmentStatus(
        investmentStatus.id,
        dto
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investmentStatus"] });
      toast.success("Investment status updated successfully!");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to update investment status");
    },
  });

  const form = useForm({
    defaultValues: {
      status_name: investmentStatus.status_name,
      order: investmentStatus.order,
      status_type: investmentStatus.status_type,
      status_color: investmentStatus.status_color
    },
    validators: {
      onChange: updateInvestmentStatusValidation,
    },
    onSubmit: async ({ value }) => {
      updateStatus({
        status_name: value.status_name,
        order: value.order,
        status_type: value.status_type,
        status_color: value.status_color,
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Investment Status</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="space-y-4 mt-4">
            {/* STATUS NAME */}
            <form.Field name="status_name">
              {(field) => (
                <div>
                  <label className="block font-medium mb-1">Status Name</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. Draft, Approved, Rejected"
                    className="w-full border rounded px-3 py-2"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* ORDER */}
            <form.Field name="order">
              {(field) => (
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">Order</label>
                  <input
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(Number(e.target.value))
                    }
                    onBlur={field.handleBlur}
                    type="number"
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* STATUS TYPE */}
            <form.Field name="status_type">
              {(field) => (
                <div>
                  <label className="block font-medium mb-1">Status Type</label>
                  {/* <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. process, done"
                    className="w-full border rounded px-3 py-2"
                  /> */}
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full px-4 py-3 border rounded-lg"
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* STATUS COLOR */}
            <form.Field name="status_color">
              {(field) => (
                <div>
                  <label className="block font-medium mb-1">Status Color</label>

                  <div className="flex items-center gap-3">
                    {/* Color Picker */}
                    <input
                      type="color"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-10 w-16 rounded cursor-pointer border"
                    />

                    {/* Hex Input */}
                    <input
                      type="text"
                      value={field.state.value}
                      onChange={(e) => {
                        const val = e.target.value.startsWith("#")
                          ? e.target.value
                          : `#${e.target.value}`;
                        field.handleChange(val);
                      }}
                      className="w-full border rounded px-3 py-2"
                    />

                    <FieldInfo field={field} />
                  </div>
                </div>
              )}
            </form.Field>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                disabled={isPending}
                className="bg-yellow-500 hover:bg-yellow-600"
                type="submit"
              >
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}