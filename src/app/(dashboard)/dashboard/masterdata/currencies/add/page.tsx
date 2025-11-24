"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Wallet } from "lucide-react";
// import api from "@/common/lib/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { currencyService } from "@/services/CurrencyService";
import { toast } from "sonner";
import { createCurrenciesValidation } from "@/common/validation/currenciesSchema";
import FieldInfo from "@/components/FieldInfo";
import { useSidebarLayout } from "@/components/LayoutClient";

export default function AddCurrencyPage() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: createCurrency, isPending: isCreating } = useMutation({
    mutationKey: ["createCurrency"],
    mutationFn: currencyService.createCurrency,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currencies"],
      });
      toast.success("Mata uang berhasil dibuat!");
      router.push("/dashboard/masterdata/currencies");
    },
    onError: () => {
      toast.error("Gagal membuat mata uang");
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      symbol: "",
      code: "",
      order: 1,
    },
    validators: {
      onChange: createCurrenciesValidation,
    },
    onSubmit: async ({ value }) => {
      createCurrency({
        name: value.name,
        code: value.code,
        symbol: value.symbol,
        order: value.order,
      });
    },
  });

  const { sidebarCollapsed } = useSidebarLayout();
  const containerWidthClass = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed],
  );

  return (
    <div className={`${containerWidthClass} mx-auto px-4 py-4`}>
      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/dashboard/masterdata/currencies")}
        className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Kembali ke Mata Uang</span>
      </button>

      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-yellow-500 rounded-md flex items-center justify-center">
          <Wallet className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Tambah Mata Uang</h1>
      </div>

      {/* FULL CARD */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <form.Field name="name">
              {(field) => {
                return (
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-700">Nama</label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="contoh: Rupiah Indonesia"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm 
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </form.Field>
            <form.Field name="symbol">
              {(field) => {
                return (
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-700">Simbol</label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="contoh: Rp"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm 
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </form.Field>

            <form.Field name="code">
              {(field) => {
                return (
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-700">Kode</label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      placeholder="contoh: IDR"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm 
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </form.Field>

            <form.Field name="order">
              {(field) => {
                return (
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-700">Urutan</label>
                    <input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      type="text"
                      placeholder="contoh: 1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm 
                focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </form.Field>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/masterdata/currencies")}
              className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-5 py-2.5 text-sm bg-yellow-500 text-white rounded-lg 
              hover:bg-yellow-600 disabled:opacity-50"
            >
              {isCreating ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
