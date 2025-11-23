"use client";

import React from "react";
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
import { useForm } from "@tanstack/react-form";
import { updateInvestortypeValidation } from "@/common/validation/investortypeSchema";
import FieldInfo from "./FieldInfo";
import { UpdateInvestortypeDto } from "@/common/dto/investortypeDto";

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
  const queryClient = useQueryClient();

  const { mutate: updateInvestorType, isPending } = useMutation({
    mutationKey: ["updateInvestorType"],
    mutationFn: (dto: UpdateInvestortypeDto) =>
      investorTypeService.updateInvestorType(investorType.id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investorType"] });
      toast.success("Tipe investor berhasil diperbarui!");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Gagal memperbarui tipe investor");
    },
  });

  const form = useForm({
    defaultValues: {
      name: investorType.name,
      color: investorType.color,
    },
    validators: {
      onChange: updateInvestortypeValidation,
    },
    onSubmit: async ({ value }) => {
      updateInvestorType({
        name: value.name,
        color: value.color,
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Perbarui Tipe Investor</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="space-y-4 mt-4">
            <form.Field name="name">
              {(field) => {
                return (
                  <div>
                    <label className="block font-medium mb-1">Nama</label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="contoh: Venture Capital"
                      className="w-full border rounded px-3 py-2"
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </form.Field>

            <form.Field name="color">
              {(field) => {
                return (
                  <div>
                    <label className="block font-medium mb-1">Warna</label>
                    <div className="flex items-center gap-3">
                      {/* Input Color Picker */}
                      <input
                        type="color"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-10 w-16 rounded cursor-pointer border"
                      />

                      {/* Hex Text Input */}
                      <input
                        type="text"
                        name="color"
                        value={field.state.value}
                        onChange={(e) => {
                          const v = e.target.value.startsWith("#")
                            ? e.target.value
                            : `#${e.target.value}`;
                          field.handleChange(v);
                        }}
                        className="w-full border rounded px-3 py-2"
                      />
                      <FieldInfo field={field} />
                    </div>
                  </div>
                );
              }}
            </form.Field>

            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Batal
              </Button>
              <Button
                disabled={isPending}
                className="bg-yellow-500 hover:bg-yellow-600"
                type="submit"
              >
                {isPending ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  );
}