"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  Plus,
  ArrowUpDown,
  Trash2,
  Pencil,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { investorService } from "@/services/InvestorService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ConfirmDialog";
import UpdateInvestor from "@/components/UpdateInvestor";
import { Investor } from "@/common/model";

export default function InvestorsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenDelete, setIsopenDelete] = useState(false);
  const queryClient = useQueryClient();
  // const [isUpdateOpen, setIUpdateOpen] = useState(false)
  // const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(
  //   null
  // )
  const [selectedInvestorId, setSelectedInvestorId] = useState<number | null>(
    null
  );
  const { data: investordata, isLoading: isLoadingInvestor } = useQuery({
    queryKey: ["investors"],
    queryFn: () => investorService.getAllInvestors(1, 100),
  });

  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(
    null
  )

  const { mutate: deleteInvestor } = useMutation({
    mutationKey: ["deleteInvestor"],
    mutationFn: investorService.deleteInvestor,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["investors"],
      });
      toast.success("Successly delete investor");
      setIsopenDelete(false);
    },
    onError: () => {
      toast.error("Failed delete investor");
      setIsopenDelete(false);
    },
  });

  const filteredInvestors = investordata?.filter((inv) =>
    inv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [isUpdateOpen, setIsUpdateOpen] = useState(false)

  function handleRefresh() {
    queryClient.invalidateQueries({
      queryKey: ["investors"],
    });
    toast.success("Successly refresh");
  }

  return (
    <>
      {selectedInvestorId != null && isOpenDelete && (
        <ConfirmDialog
          isOpen={isOpenDelete}
          onClose={() => setIsopenDelete(false)}
          onConfirm={() => deleteInvestor(selectedInvestorId)}
          title="Deleted Investor"
          cancelText="Batal"
          description="Anda yakin ingin menghapus investor ini?"
          confirmText="Hapus"
        />
      )}
     {isUpdateOpen && selectedInvestor && (
        <UpdateInvestor
          investor={selectedInvestor}
          isOpen={isUpdateOpen}
          setIsOpen={setIsUpdateOpen}
        />
     )}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Investors</h1>
          </div>
          <p className="text-gray-600">
            Manage your investor relationships and contact information.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Advanced Filters</span>
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleRefresh}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={() => router.push("/dashboard/investors/add")}
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Investor</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900">
                      <span>Name</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Website</th>
                  <th className="px-6 py-3 text-left">Date Created</th>
                  <th className="px-6 py-3 text-left">Date Updated</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingInvestor ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-gray-400"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : filteredInvestors?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-gray-400"
                    >
                      No investors found.
                    </td>
                  </tr>
                ) : (
                  filteredInvestors?.map((inv) => (
                    <tr
                      key={inv.id}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-6 py-3 text-sm text-gray-800">
                        {inv.name}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: inv.investor_type?.color,
                            }}
                          />
                          <span>{inv.investor_type?.name || "-"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-sm text-blue-600 underline">
                        {inv.website || "-"}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600">
                        {new Date(inv.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600">
                        {new Date(inv.updated_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-700"
                          onClick={() => {
                            setSelectedInvestor(inv)
                            setIsUpdateOpen(true)
                          }}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setIsopenDelete(true);
                              setSelectedInvestorId(inv.id);
                            }}
                            className="p-1.5 rounded border border-gray-200 hover:bg-red-50 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
