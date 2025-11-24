"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserCircle } from "lucide-react";
import { investorService } from "@/services/InvestorService";
import { investorTypeService } from "@/services/InvestortypeService";
import { InvestorType } from "@/common/model";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { createInvestorValidation } from "@/common/validation/investorSchema";
import FieldInfo from "@/components/FieldInfo";
import { useMutation } from "@tanstack/react-query";
import { InvestorTypeSelector } from "@/components/selectors/InvestorTypeSelector";
import { useSidebarLayout } from "@/components/LayoutClient";

export default function AddInvestorPage() {
  const router = useRouter();
  const { sidebarCollapsed } = useSidebarLayout();
  const containerWidthClass = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-3xl"),
    [sidebarCollapsed],
  );

  const [types, setTypes] = useState<InvestorType[]>([]);

  useEffect(() => {
    investorTypeService.getAllInvestorTypes().then(setTypes);
  }, []);

  const { mutate: createInvestor, isPending: isCreating } = useMutation({
    mutationKey: ["createInvestor"],
    mutationFn: investorService.createInvestor,
    onSuccess: () => {
      toast.success("Berhasil membuat investor");
      router.push("/dashboard/investors");
    },
    onError: () => {
      toast.error("Gagal membuat investor");
    },
  });

  const formValidasi = useForm({
    defaultValues: {
      investor_name: "",
      website: "",
      investor_type_id: 0,
    },
    validators: {
      onChange: createInvestorValidation,
    },
    onSubmit: async ({ value }) => {
      createInvestor({
        investor_name: value.investor_name,
        website: value.website,
        investor_type_id: value.investor_type_id,
      });
    },
  });

  return (
    <div className="min-h-full bg-slate-50 px-4 py-4">
      <div className={`${containerWidthClass} mx-auto space-y-4`}>
        <button
          type="button"
          onClick={() => router.push("/dashboard/investors")}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Kembali ke Investor</span>
        </button>

        <header className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
            <UserCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Tambah Investor
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              Lengkapi detail investor untuk menambahkannya ke sistem.
            </p>
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-yellow-100 p-6 sm:p-8">
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            formValidasi.handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <formValidasi.Field name="investor_name">
              {(field) => {
                return (
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-700">Nama</label>
                    <input
                      title={field.name}
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </formValidasi.Field>

            <formValidasi.Field name="website">
              {(field) => {
                return (
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-700">Situs Web</label>
                    <input
                      title={field.name}
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      type="website"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </formValidasi.Field>

            <formValidasi.Field name="investor_type_id">
              {(field) => {
                return (
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-700">Tipe Investor</label>
                    <InvestorTypeSelector
                      data={types as []}
                      onChange={field.handleChange}
                      value={field.state.value || 0}
                    />
                    <FieldInfo field={field} />
                  </div>
                );
              }}
            </formValidasi.Field>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/investors")}
              className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-5 py-2.5 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              {isCreating ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
