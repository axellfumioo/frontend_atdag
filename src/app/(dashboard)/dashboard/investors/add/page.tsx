"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserCircle } from "lucide-react";
import { investorService } from "@/services/InvestorService";
import { investorTypeService } from "@/services/InvestortypeService";
import { CreateInvestorDto } from "@/common/dto/investorDto";
import { InvestorType } from "@/common/model";
import { toast } from "sonner";

export default function AddInvestorPage() {
  const router = useRouter();
  const [form, setForm] = useState<CreateInvestorDto>({
    investor_name: "",
    website: "",
    investor_type_id: 0,
  });
  const [types, setTypes] = useState<InvestorType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    investorTypeService.getAllInvestorTypes(1, 100).then(setTypes);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "investor_type_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await investorService.createInvestor(form);
      toast.success("Successly create investor")
      router.push("/dashboard/investors");
    } catch (err) {
      console.error("Failed to create investor", err);
    } finally {
      setLoading(false);
    }
  };

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
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="investor_name"
                value={form.investor_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Website</label>
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Investor Type</label>
              <select
                name="investor_type_id"
                value={form.investor_type_id}
                onChange={handleChange}
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
            </div>
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
              disabled={loading}
              className="px-5 py-2.5 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              {loading ? "Saving..." : "Save Investor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}