"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Palette } from "lucide-react";
import { investorTypeService } from "@/services/InvestortypeService";
import { CreateInvestortypeDto } from "@/common/dto/investortypeDto";

export default function AddInvestorTypePage() {
  const router = useRouter();

  const [form, setForm] = useState<CreateInvestortypeDto>({
    name: "",
    color: "#000000",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await investorTypeService.createInvestorType(form);
      router.push("/dashboard/masterdata/investortypes");
    } catch (err) {
      console.error("Failed to create investor type", err);
    } finally {
      setLoading(false);
    }
  };

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
        <form className="space-y-8" onSubmit={handleSubmit}>
          
          {/* Name */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">Type Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* Color */}
          <div>
            <label className="block font-medium mb-1">Color</label>
            <div className="flex items-center gap-3">

              {/* Color Picker */}
              <input
                type="color"
                name="color"
                value={form.color}
                onChange={handleChange}
                className="h-10 w-16 rounded cursor-pointer border"
              />

              {/* Hex Input */}
              <input
                type="text"
                name="color"
                value={form.color}
                onChange={handleChange}
                placeholder="#FFAA00"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/masterdata/investortypes")}
              className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              {loading ? "Saving..." : "Save Investor Type"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}