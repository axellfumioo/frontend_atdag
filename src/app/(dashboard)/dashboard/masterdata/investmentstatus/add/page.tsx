"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Tag } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

import { investmentStatusService } from "@/services/InvestmentStatusService";
import { toast } from "sonner";
import FieldInfo from "@/components/FieldInfo";
import { createInvestmentStatusValidation } from "@/common/validation/investmentstatusSchema";

// VALIDASI
// const createInvestmentStatusValidation = z.object({
//   status_name: z.string().min(2, "Minimal 2 karakter"),
//   order: z.coerce.number().min(1, "Minimal 1"),
//   status_type: z.enum(["Open", "Closed", "Cancelled"]),
//   status_color: z.string().min(4, "Harus berupa hex warna, contoh: #FF0000"),
// });

export default function AddInvestmentStatusPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: createStatus, isPending } = useMutation({
    mutationKey: ["createInvestmentStatus"],
    mutationFn: investmentStatusService.createInvestmentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investmentStatuses"] });
      toast.success("Berhasil membuat status investasi");
      router.push("/dashboard/masterdata/investmentstatus");
    },
    onError: () => {
      toast.error("Gagal membuat status investasi");
    },
  });

  const form = useForm({
    defaultValues: {
      status_name: "",
      status_type: "",
      status_color: "#000000",
      order: 1,
    },
    validators: {
      onChange: createInvestmentStatusValidation,
    },
    onSubmit: async ({ value }) => {
      createStatus({
        status_name: value.status_name,
        status_type: value.status_type.toLocaleUpperCase(),
        status_color: value.status_color,
        order: value.order,
      });
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/dashboard/masterdata/investmentstatus")}
        className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Kembali ke Status Investasi</span>
      </button>

      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-yellow-500 rounded-md flex items-center justify-center">
          <Tag className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Tambah Status Investasi</h1>
      </div>

      {/* Card */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Status Name */}
            <form.Field name="status_name">
              {(field) => (
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">Nama Status</label>
                  <input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    type="text"
                    placeholder="Contoh: Lead Generation"
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Order */}
            <form.Field name="order">
              {(field) => (
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">Urutan</label>
                  <input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    onBlur={field.handleBlur}
                    type="number"
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Status Type */}
            <form.Field name="status_type">
              {(field) => (
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium">Tipe Status</label>
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="w-full px-3 py-3 border rounded-lg"
                  >
                    <option value="">Pilih tipe status</option>

                    {["OPEN", "CLOSED", "CANCELLED"].map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Color */}
            <form.Field name="status_color">
              {(field) => {
                return (
                  <div>
                    <label className="block font-medium mb-1">Warna</label>
                    <div className="flex items-center gap-3">
                      {/* Color picker */}
                      <input
                        type="color"
                        name="color"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="h-10 w-16 rounded cursor-pointer border"
                      />

                      {/* Hex input*/}
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
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-5 py-2 border rounded-lg"
              onClick={() =>
                router.push("/dashboard/masterdata/investmentstatus")
              }
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50"
            >
              {isPending ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
