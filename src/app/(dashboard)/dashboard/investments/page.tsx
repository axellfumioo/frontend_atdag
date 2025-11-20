"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  RefreshCw,
  Plus,
  ArrowUpDown,
  TrendingUp,
  Pencil,
  Trash2,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { investmentService } from "@/services/InvestmentService";
import ConfirmDialog from "@/components/ConfirmDialog";
import { toast } from "sonner";
import UpdateInvestment from "@/components/UpdateInvestment";
import { Investment } from "@/common/model";

export default function InvestmentsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsopenDelete] = useState(false);
  const [selectedInvestmentType, setSelectedInvestmentType] =
    useState<Investment | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: investmentsData,
    isLoading,
    refetch: refetchInvestments,
  } = useQuery({
    queryKey: ["investments"],
    queryFn: () => investmentService.getAllInvestments(currentPage),
  });

  const filteredInvesmentsData = investmentsData?.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const { mutate: deleteInvestment } = useMutation({
    mutationKey: ["deleteInvestment"],
    mutationFn: (investmentId: number) =>
      investmentService.deleteInvestment(investmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["investments"],
      });
      toast.success("Berhasil menghapus investment");
      setIsopenDelete(false);
    },
    onError: () => {
      toast.error("Gagal menghapus investment");
      setIsopenDelete(false);
    },
  });
  return (
    <>
      {setSelectedInvestmentType != null && isOpenDelete && (
        <ConfirmDialog
          isOpen={isOpenDelete}
          onClose={() => setIsopenDelete(false)}
          onConfirm={() =>
            deleteInvestment(selectedInvestmentType?.investment_id!)
          }
          title="Hapus Investment"
          cancelText="Batal"
          description={`Anda yakin ingin menghapus Investment ${selectedInvestmentType?.name}`}
          confirmText="Hapus"
        />
      )}
      {isOpenUpdate && selectedInvestmentType && (
        <UpdateInvestment
          investment={selectedInvestmentType!}
          isOpen={isOpenUpdate}
          setIsOpen={setIsOpenUpdate}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Investments</h1>
              <p className="text-gray-600">
                Track and manage investment opportunities and their progress.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by investor name..."
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
                  onClick={() => refetchInvestments()}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>

                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors"
                  onClick={() => router.push("/dashboard/investments/add")}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Investment</span>
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
                      <span>Investment Name</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900">
                      <span>Investor</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900">
                      <span>Stage</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900">
                      <span>Status</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Value
                    </span>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Description
                    </span>
                  </th>

                  <th className="px-6 py-3 text-left">
                    <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Expected Closing
                    </span>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Closing Date
                    </span>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900">
                      <span>Date Created</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900">
                      <span>Date Updated</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!isLoading && !filteredInvesmentsData ? (
                  <tr>
                    <td colSpan={11} className="px-6 py-16">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <svg
                            className="w-10 h-10 text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-400 text-sm">No data</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredInvesmentsData?.map((item) => {
                    return (
                      <tr
                        key={item.investment_id}
                        className="border-b border-gray-100 last:border-0"
                      >
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {item.name}
                        </td>
                        <td className="px-6 py-3 text-sm font-semibold text-gray-800">
                          {item.investor.name}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {item.investment_stage.name}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {item.investment_status.status_name}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {item.value}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {item.description}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {new Date(item.expected_closing_date).toLocaleDateString(
                            "id-ID"
                          )}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {new Date (item.closing_date).toLocaleDateString(
                            "id-ID"
                          )}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {new Date(item.created_at).toLocaleDateString(
                            "id-ID"
                          )}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {new Date(item.updated_at).toLocaleDateString(
                            "id-ID"
                          )}
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              title="edit"
                              onClick={() => {
                                setIsOpenUpdate(true);
                                setSelectedInvestmentType(item);
                              }}
                              className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-700"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              title="delete"
                              onClick={() => {
                                setIsopenDelete(true);
                                setSelectedInvestmentType(item);
                              }}
                              className="p-1.5 rounded border border-gray-200 hover:bg-red-50 text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
