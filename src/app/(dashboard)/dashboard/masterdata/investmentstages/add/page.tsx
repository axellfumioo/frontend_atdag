"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BarChart2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { investmentStageService } from "@/services/InvestmentStageService";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { createInvestmentstageValidation } from "@/common/validation/investmentstageSchema";
import FieldInfo from "@/components/FieldInfo";

export default function AddInvestmentStagePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: createInvestmentStage, isPending: isCreating } = useMutation({
    mutationKey: ["createInvestmentStage"],
    mutationFn: investmentStageService.createInvestmentStage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["investmentStages"],
      });
      toast.success("Tahap investasi berhasil dibuat!");
      router.push("/dashboard/masterdata/investmentstages");
    },
    onError: () => {
      toast.error("Gagal membuat tahap investasi");
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      order: 1,
    },
    validators: {
      onChange: createInvestmentstageValidation,
    },
    onSubmit: async ({ value }) => {
      createInvestmentStage({
        name: value.name,
        order: value.order
      });
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/dashboard/investments")}
        className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Kembali ke Investasi</span>
      </button>

      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
          <BarChart2 className="w-4 h-4 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Tambah Tahap Investasi</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* Stage Name */}
          <form.Field name="name">
            {(field) => (
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Nama Tahap</label>

                <input
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder="Masukkan nama tahap"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />

                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          {/* Stage Order */}
          <form.Field name="order">
            {(field) => (
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Urutan Tahap</label>

                <input
                  id={field.name}
                  name={field.name}
                  type="number"
                  placeholder="Masukkan urutan tahap"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />

                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/dashboard/investmentstages")}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isCreating}
              className="px-4 py-2 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50"
            >
              {isCreating ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}