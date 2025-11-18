"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/common/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/shadcn/ui/dialog";
import { InvestorType } from "@/common/model";
import { investorTypeService } from "@/services/InvestortypeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  investorType: InvestorType;
}

export default function UpdateInvestorType({
  isOpen,
  setIsOpen,
  investorType,
}: Props) {
  const [name, setName] = useState(investorType.name);
  const [color, setColor] = useState(investorType.color);

  const queryClient = useQueryClient();

  useEffect(() => {
    setName(investorType.name);
    setColor(investorType.color);
  }, [investorType]);

  const { mutate: updateType, isPending } = useMutation({
    mutationKey: ["updateInvestorType"],
    mutationFn: () =>
      investorTypeService.updateInvestorType(investorType.id, {
        name,
        color,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investorType"] });
      toast.success("Investor type updated successfully!");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to update investor type");
    },
  });

  function handleSubmit() {
    updateType();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Investor Type</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Venture Capital"
              className="w-full border rounded px-3 py-2"
            />
          </div>

         <div>
            <label className="block font-medium mb-1">Color</label>
            <div className="flex items-center gap-3">
                {/* Input Color Picker */}
                <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-16 rounded cursor-pointer border"
                />

                {/* Hex Text Input */}
                <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#FFAA00"
                className="w-full border rounded px-3 py-2"
                />
            </div>
            </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}