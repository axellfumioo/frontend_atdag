"use client";

import React, { useState } from "react";
import { Button } from "@/common/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/shadcn/ui/dialog";
import { Investor } from "@/common/model";
import { investorService } from "@/services/InvestorService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  investor: Investor;
}

export default function UpdateInvestor({ isOpen, setIsOpen, investor }: Props) {
  const [name, setName] = useState(investor.name);
  const [website, setWebsite] = useState(investor.website);
  const [investorTypeId, setInvestorTypeId] = useState(investor.investor_type_id);

  const queryClient = useQueryClient();

  const { mutate: updateInvestor, isPending } = useMutation({
    mutationKey: ["updateInvestor"],
    mutationFn: () =>
      investorService.updateInvestor({
        investor_id: investor.id,
        investor_name: name,
        website,
        investor_type_id: investorTypeId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investors"] });
      toast.success("Investor updated successfully!");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to update investor");
    },
  });

  function handleSubmit() {
    updateInvestor();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Investor</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Investor Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sequoia Capital"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="website" className="block font-medium mb-1">
              Website
            </label>
            <input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="e.g. https://example.com"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="investorTypeId" className="block font-medium mb-1">
              Investor Type ID
            </label>
            <input
              id="investorTypeId"
              type="number"
              value={investorTypeId}
              onChange={(e) => setInvestorTypeId(Number(e.target.value))}
              placeholder="e.g. 1"
              className="w-full border rounded px-3 py-2"
            />
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
