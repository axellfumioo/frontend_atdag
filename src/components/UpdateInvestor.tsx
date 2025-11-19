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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { investorTypeService } from "@/services/InvestortypeService";
import { useForm } from "@tanstack/react-form"; 
import { UpdateInvestorDto } from "@/common/dto/investorDto";
import { updateInvestorValidation } from "@/common/validation/investorSchema";
import FieldInfo from "./FieldInfo";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  investor: Investor;
}

export default function UpdateInvestor({ isOpen, setIsOpen, investor }: Props) {
  const [investorTypeId] = useState(
    investor.investor_type_id
  );

  const queryClient = useQueryClient();

  const { data: investorType} = useQuery({
    queryKey: ["investorType"],
    queryFn: () => investorTypeService.getAllInvestorTypes(1, 100),
  });

  const { mutate: updateInvestor, isPending } = useMutation({
    mutationKey: ["updateInvestor"],
     mutationFn: (dto: UpdateInvestorDto) =>
          investorService.updateInvestor(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investors"] });
      toast.success("Investor updated successfully!");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to update investor");
    },
  });

  const form = useForm({
    defaultValues: {
      investor_id: investor.id,
      investor_name: investor.name,
      website: investor.website,
      investor_type_id: investorTypeId
    },
    validators: {
      onChange: updateInvestorValidation
    },
    onSubmit: async ({value}) => {
      updateInvestor({
        investor_id: value.investor_id,
        investor_type_id: value.investor_type_id,
        investor_name: value.investor_name,
        website: value.website
      })
    }

  })



  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Investor</DialogTitle>
        </DialogHeader>

        <form className="space-y-4 mt-4"
         onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
        <form.Field name="investor_name">
          {(field) => {
            return (
              <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Investor Name
            </label>
            <input
               id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
              placeholder="e.g. Sequoia Capital"
              className="w-full border rounded px-3 py-2"
            />
                              <FieldInfo field={field} />
            
          </div>
            )
          }}
        </form.Field>

        <form.Field name="website">
          {(field) => {
            return (
              <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Website
            </label>
            <input
               id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
              placeholder="e.g. Sequoia Capital"
              className="w-full border rounded px-3 py-2"
            />
                              <FieldInfo field={field} />
            
          </div>
            )
          }}
        </form.Field>

         
        <form.Field name="investor_type_id">
          {(field) => {
            return (
               <div>
              <label className="block font-medium mb-1">Type</label>
              <select
                id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                required
            
              >
                <option value="">Select investor type</option>
                {investorType &&
                  investorType?.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
                                            <FieldInfo field={field} />

            </div>
            )
          }}
        </form.Field>


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
