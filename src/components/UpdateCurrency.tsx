"use client";

import React from "react";
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
import { useForm } from "@tanstack/react-form";
import { updateCurrenciesValidation } from "@/common/validation/currenciesSchema";
import FieldInfo from "./FieldInfo";
import { UpdateCurrencyDto } from "@/common/dto/currency.dto";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currency: Currency;
}

export default function UpdateCurrency({ isOpen, setIsOpen, currency }: Props) {
  const queryClient = useQueryClient();

  const { mutate: updateCurrency } = useMutation({
    mutationKey: ["updateCurrency"],
    mutationFn: (dto: UpdateCurrencyDto) =>
      currencyService.updateCurrency(currency.id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currencies"],
      });
      toast.success("Mata uang berhasil diperbarui!");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Gagal memperbarui mata uang");
    },
  });

  const form = useForm({
    defaultValues: {
      name: currency.name,
      code: currency.code,
      symbol: currency.symbol,
      order: currency.order,
    },
    validators: {
      onChange: updateCurrenciesValidation,
    },
    onSubmit: async ({ value }) => {
      updateCurrency({
        name: value.name,
        code: value.code,
        symbol: value.symbol,
        order: value.order,
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Perbarui Mata Uang</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 mt-4"
        >
          <form.Field name="name">
            {(field) => {
              return (
                <div>
                  <label htmlFor="name" className="block font-medium mb-1">Nama Mata Uang</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="contoh: IDR"
                    className="w-full border rounded px-3 py-2"
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>

          <form.Field name="symbol">
            {(field) => {
              return (
                <div>
                  <label htmlFor="symbol" className="block font-medium mb-1">Simbol Mata Uang</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. USD"
                    className="w-full border rounded px-3 py-2"
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>

          <form.Field name="code">
            {(field) => {
              return (
                <div>
                  <label htmlFor="code" className="block font-medium mb-1">Kode Mata Uang</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. USD"
                    className="w-full border rounded px-3 py-2"
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>

          <form.Field name="order">
            {(field) => {
              return (
                <div>
                  <label htmlFor="order" className="block font-medium mb-1">Urutan Mata Uang</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    placeholder="e.g. USD"
                    className="w-full border rounded px-3 py-2"
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          </form.Field>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600">
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
