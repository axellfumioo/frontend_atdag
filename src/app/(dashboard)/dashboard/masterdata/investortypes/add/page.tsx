"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Palette } from "lucide-react";
import { investorTypeService } from "@/services/InvestortypeService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { createInvestortypeValidation } from "@/common/validation/investortypeSchema";
import FieldInfo from "@/components/FieldInfo";

export default function AddInvestorTypePage() {
  const router = useRouter();

  const { mutate: createInvestorType, isPending: isCreating } = useMutation({
    mutationKey: ["createInvestorType"],
    mutationFn: investorTypeService.createInvestorType,
    onSuccess: () => {
      toast.success("Successfully created investor type");
      router.push("/dashboard/masterdata/investortypes");
    },
    onError: () => {
      toast.error("Failed to created investor type");
    },
  });

  const formValidasi = useForm({
    defaultValues: {
      name: "",
      color: "#000000", // default hex color
    },
    validators: {
      onChange: createInvestortypeValidation,
    },
    onSubmit: async ({ value }) => {
      createInvestorType({
        name: value.name,
        color: value.color
      })
    },
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-4">
      <button
        type="button"
        onClick={() => router.push("/dashboard/masterdata/investortypes")}
        className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span>Back to Investor Types</span>
      </button>

      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-yellow-500 rounded-md flex items-center justify-center">
          <Palette className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Add Investor Type</h1>
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
          <div>
            <formValidasi.Field name="name">
              {(field) => {
                return (
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-700">
                      Type Name
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

            <formValidasi.Field name="color">
              {(field) => {
                return (
                  <div>
                    <label className="block font-medium mb-1">Color</label>
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
            </formValidasi.Field>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() =>
                  router.push("/dashboard/masterdata/investortypes")
                }
                className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isCreating}
                className="px-5 py-2.5 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-60"
              >
                {isCreating ? "Saving..." : "Save Investor Type"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}