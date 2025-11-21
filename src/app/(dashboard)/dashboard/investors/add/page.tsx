"use client";

import React, { useEffect, useState } from "react";
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

export default function AddInvestorPage() {
  const router = useRouter();

  const [types, setTypes] = useState<InvestorType[]>([]);

  useEffect(() => {
    investorTypeService.getAllInvestorTypes().then(setTypes);
  }, []);

  const { mutate: createInvestor, isPending: isCreating } = useMutation({
    mutationKey: ["createInvestor"],
    mutationFn: investorService.createInvestor,
    onSuccess: () => {
      toast.success("Successly created investor");
      router.push("/dashboard/investors");
    },
    onError: () => {
      toast.error("Failed to created Investor");
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
    <div className="max-w-7xl mx-auto px-4 py-4">
      <button
        type="button"
        onClick={() => router.push("/dashboard/investors")}
        className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Back to Investors</span>
      </button>

      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-yellow-500 rounded-md flex items-center justify-center">
          <UserCircle className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Add Investor</h1>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
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
                    <label className="text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
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
                    <label className="text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <input
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
                    <label className="text-sm font-medium text-gray-700">
                      Investor Type
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                      <option value="">Select Type</option>
                      {types?.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
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
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating}
              className="px-5 py-2.5 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              {isCreating ? "Saving..." : "Save Investor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
