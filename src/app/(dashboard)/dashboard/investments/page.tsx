"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  // Filter,
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
import { useSidebarLayout } from "@/components/LayoutClient";

export default function InvestmentsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsopenDelete] = useState(false);
  const [selectedInvestmentType, setSelectedInvestmentType] =
    useState<Investment | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { sidebarCollapsed } = useSidebarLayout();

  const {
    data: investmentsData,
    isLoading,
    refetch: refetchInvestments,
  } = useQuery({
    queryKey: ["investments", currentPage],
    queryFn: () => investmentService.getAllInvestments(currentPage),
  });

  const filteredInvesmentsData = investmentsData
    ? investmentsData.filter((item) => {
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : [];

  const { mutate: deleteInvestment } = useMutation({
    mutationKey: ["deleteInvestment"],
    mutationFn: (investmentId: number) =>
      investmentService.deleteInvestment(investmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["investments"],
      });
      toast.success("Berhasil menghapus investasi");
      setIsopenDelete(false);
    },
    onError: () => {
      toast.error("Gagal menghapus investasi");
      setIsopenDelete(false);
    },
  });
  const containerWidthClass = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed],
  );

  return (
    <>
      {selectedInvestmentType && isOpenDelete && (
        <ConfirmDialog
          isOpen={isOpenDelete}
          onClose={() => setIsopenDelete(false)}
          onConfirm={() =>
            deleteInvestment(selectedInvestmentType.investment_id)
          }
          title="Hapus Investasi"
          cancelText="Batal"
          description={`Apakah kamu yakin ingin menghapus investasi ${selectedInvestmentType.name}?`}
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
      <div className={`${containerWidthClass} mx-auto px-4 py-4 space-y-4`}>
        {/* Header Section */}
        <section className="rounded-2xl border border-yellow-100 bg-white/95 px-5 py-5 shadow-sm">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  Investasi
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-gray-600">
                  Pantau dan kelola peluang investasi beserta progresnya.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-100 bg-white px-3 py-1 text-xs font-medium text-gray-600">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]" />
              Data tersinkronisasi
            </div>
          </header>
        </section>

        {/* Controls + Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-yellow-100 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari berdasarkan nama investasi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                {/* <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Advanced Filters</span>
                </button> */}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={async () => {
                    await refetchInvestments();
                    toast.success("Data investasi diperbarui");
                  }}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Segarkan</span>
                </button>

                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors"
                  onClick={() => router.push("/dashboard/investments/add")}
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Investasi</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="relative overflow-x-auto max-h-[70vh]">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-[11px] font-medium text-gray-600 uppercase tracking-wide hover:text-gray-900">
                      <span>Nama Investasi</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">
                    Investor
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">
                    Tahapan
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">
                    Nilai
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">
                    Deskripsi
                  </th>

                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">
                    Perkiraan Penutupan
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">
                    Tanggal Penutupan
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-[11px] font-medium text-gray-600 uppercase tracking-wide hover:text-gray-900">
                      <span>Tanggal Dibuat</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-[11px] font-medium text-gray-600 uppercase tracking-wide hover:text-gray-900">
                      <span>Tanggal Diperbarui</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="px-6 py-3"><div className="h-4 w-44 bg-gray-100 rounded animate-pulse" /></td>
                      <td className="px-6 py-3"><div className="h-4 w-36 bg-gray-100 rounded animate-pulse" /></td>
                      <td className="px-6 py-3"><div className="h-4 w-28 bg-gray-100 rounded animate-pulse" /></td>
                      <td className="px-6 py-3"><div className="h-4 w-24 bg-gray-100 rounded animate-pulse" /></td>
                      <td className="px-6 py-3"><div className="h-4 w-20 bg-gray-100 rounded animate-pulse" /></td>
                      <td className="px-6 py-3"><div className="h-4 w-24 bg-gray-100 rounded animate-pulse" /></td>
                      <td className="px-6 py-3"><div className="h-4 w-28 bg-gray-100 rounded animate-pulse" /></td>
                      <td className="px-6 py-3"><div className="h-4 w-28 bg-gray-100 rounded animate-pulse" /></td>
                      <td className="px-6 py-3"><div className="h-4 w-28 bg-gray-100 rounded animate-pulse" /></td>
                      <td className="px-6 py-3"><div className="h-4 w-28 bg-gray-100 rounded animate-pulse" /></td>
                      <td className="px-6 py-3"><div className="h-6 w-20 bg-gray-100 rounded animate-pulse" /></td>
                    </tr>
                  ))
                ) : filteredInvesmentsData.length === 0 ? (
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
                        <p className="text-gray-400 text-sm">Investasi tidak ditemukan</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredInvesmentsData?.map((item) => {
                    return (
                      <tr
                        key={item.investment_id}
                        className="group border-b border-gray-100 last:border-0 hover:bg-gray-50/80"
                      >
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {item.name}
                        </td>
                        <td className="px-6 py-3 text-sm font-semibold text-gray-800">
                          {item.investor?.name || ""}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          <span className="inline-flex items-center gap-2 rounded-full border px-2 py-0.5 text-xs">
                            <span className="w-2 h-2 rounded-full bg-gray-400" />
                            <span>{item.investment_stage.name}</span>
                          </span>
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          <span
                            className="inline-flex items-center gap-2 rounded-full border px-2 py-0.5 text-xs"
                            style={{ borderColor: (item.investment_status as any)?.status_color || "#E5E7EB" }}
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: (item.investment_status as any)?.status_color || "#9CA3AF" }}
                            />
                            <span>{item.investment_status.status_name}</span>
                          </span>
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {item.value}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {item.description}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                          {new Date(
                            item.expected_closing_date
                          ).toLocaleDateString("id-ID")}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                          {new Date(item.closing_date).toLocaleDateString(
                            "id-ID"
                          )}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString(
                            "id-ID"
                          )}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                          {new Date(item.updated_at).toLocaleDateString(
                            "id-ID"
                          )}
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-2 ">
                            <button
                              title="edit"
                              onClick={() => {
                                setIsOpenUpdate(true);
                                setSelectedInvestmentType(item);
                              }}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-700"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              title="delete"
                              onClick={() => {
                                setIsopenDelete(true);
                                setSelectedInvestmentType(item);
                              }}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-gray-200 hover:bg-red-50 text-red-500 hover:text-red-600"
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
          <div className="flex items-center justify-end gap-4 px-6 py-3 border-t border-gray-200 text-sm text-gray-600">
            <button
              className="px-3 py-1 rounded border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Sebelumnya
            </button>

            <span>Halaman {currentPage}</span>

            <button
              className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Berikutnya
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
