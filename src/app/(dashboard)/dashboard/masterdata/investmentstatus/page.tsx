"use client";

import React, { useMemo, useState } from "react";
import { Search, RefreshCw, Plus, Tag, Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { investmentStatusService } from "@/services/InvestmentStatusService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ConfirmDialog";
import { InvestmentStatus } from "@/common/model";
import UpdateInvestmentStatus from "@/components/UpdateInvestmentStatus";
import { useSidebarLayout } from "@/components/LayoutClient";
import { it } from "node:test";

export default function InvestmentStatusPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { sidebarCollapsed } = useSidebarLayout();

  // NEW STATES for Editing
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<InvestmentStatus | null>(
    null
  );

  const {
    data: statuses,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["investmentStatusesWithPagination", currentPage],
    queryFn: () => investmentStatusService.getAllInvestmentStatusWithPagination(currentPage),
  });

  const { mutate: deleteInvestmentStatus } = useMutation({
    mutationKey: ["deleteInvestmentStatus"],
    mutationFn: investmentStatusService.deleteInvestmentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["investmentStatusesWithPagination"],
      });
      toast.success(`Status ${selectedStatus?.status_name} berhasil dihapus!`);
      setIsDeleteOpen(false);
      setSelectedId(null);
    },
    onError: () => {
      toast.error("Gagal menghapus status investasi");
    },
  });

  const handleDelete = (id: number) => {
    deleteInvestmentStatus(id);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
  };



  const filteredStatuses = statuses
    ? statuses.filter((item) =>
        item.status_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // colors mapping (case-insensitive)
  const statusColors: Record<string, string> = {
    open: "bg-green-100 text-green-800",
    closed: "bg-red-100 text-red-800",
    cancelled: "bg-red-100 text-red-800",
    success: "bg-blue-100 text-blue-800",
    ongoing: "bg-green-100 text-green-800",
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ["investmentStatusesWithPagination"],
    });
    toast.success("Data status investasi diperbarui");
    refetch().then(() => {
      setCurrentPage(1);
    });
  };

  const containerWidthClass = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed],
  );

  return (
    <>
      {/* DELETE DIALOG */}
      {isDeleteOpen && selectedId !== null && (
        <ConfirmDialog
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
            setSelectedId(null);
          }}
          onConfirm={() => {
            // guard before calling delete
            if (selectedId !== null) handleDelete(selectedId);
          }}
          title="Hapus Status Investasi"
          description={`Apakah kamu yakin ingin menghapus status ${selectedStatus?.status_name} ini?`}
          confirmText="Hapus"
          cancelText="Batal"
        />
      )}

      {/* UPDATE MODAL */}
      {isUpdateOpen && selectedStatus && (
        <UpdateInvestmentStatus
          isOpen={isUpdateOpen}
          setIsOpen={setIsUpdateOpen}
          investmentStatus={selectedStatus}
        />
      )}

      <div className={`${containerWidthClass} mx-auto px-4 py-4 space-y-4`}>
        {/* Header */}
        <section className="rounded-2xl border border-yellow-100 bg-white/95 px-5 py-5 shadow-sm">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  Status Investasi
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-gray-600">
                  Atur kategori status investasi lengkap dengan warna.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-100 bg-white px-3 py-1 text-xs font-medium text-gray-600">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]" />
              Data tersinkronisasi
            </div>
          </header>
        </section>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-yellow-100 overflow-hidden">
          {/* Controls */}
          <div className="p-4 border-b border-gray-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari status..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Segarkan</span>
              </button>

              <button
                onClick={() =>
                  router.push("/dashboard/masterdata/investmentstatus/add")
                }
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Status</span>
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/75 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center gap-1 text-[11px] font-medium text-gray-600 uppercase tracking-wide hover:text-gray-900">
                      <span>Urutan</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center gap-1 text-[11px] font-medium text-gray-600 uppercase tracking-wide hover:text-gray-900">
                      <span>Nama</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">
                    Warna
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">
                    Tipe Status
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center gap-1 text-[11px] font-medium text-gray-600 uppercase tracking-wide hover:text-gray-900">
                      <span>Tanggal Dibuat</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center gap-1 text-[11px] font-medium text-gray-600 uppercase tracking-wide hover:text-gray-900">
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
                      <td className="px-6 py-3">
                        <div className="h-4 w-8 bg-gray-100 rounded animate-pulse" />
                      </td>
                      <td className="px-6 py-3">
                        <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                      </td>
                      <td className="px-6 py-3">
                        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                      </td>
                      <td className="px-6 py-3">
                        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                      </td>
                      <td className="px-6 py-3">
                        <div className="h-4 w-28 bg-gray-100 rounded animate-pulse" />
                      </td>
                      <td className="px-6 py-3">
                        <div className="h-4 w-28 bg-gray-100 rounded animate-pulse" />
                      </td>
                      <td className="px-6 py-3">
                        <div className="h-6 w-20 bg-gray-100 rounded animate-pulse" />
                      </td>
                    </tr>
                  ))
                ) : filteredStatuses.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16">
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
                        <p className="text-gray-400 text-sm">
                          Status investasi tidak ditemukan
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStatuses.map((item) => {
                    const statusClass =
                      statusColors[
                        (item.status_type ?? "").toString().toLowerCase()
                      ] || "bg-gray-100 text-gray-800";

                    return (
                      <tr
                        key={item.id}
                        className="group border-b border-gray-100 last:border-0 hover:bg-gray-50/80"
                      >
                        <td className="px-6 py-3 text-sm text-gray-900">{item.order}</td>

                        <td className="px-6 py-3 text-sm text-gray-900">
                          <div className="flex items-center gap-3">
                            <span
                              className="w-3 h-3 rounded-full inline-block"
                              style={{
                                backgroundColor: item.status_color || "#ddd",
                              }}
                            />
                            <span>{item.status_name}</span>
                          </div>
                        </td>

                        <td className="px-6 py-3 text-sm font-mono text-gray-700">
                          {item.status_color}
                        </td>

                        <td className="px-6 py-3 text-sm">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${statusClass}`}
                          >
                            {item.status_type}
                          </span>
                        </td>

                        <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.created_at
                            ? new Date(item.created_at).toLocaleDateString(
                                "id-ID"
                              )
                            : "-"}
                        </td>

                        <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.updated_at
                            ? new Date(item.updated_at).toLocaleDateString(
                                "id-ID"
                              )
                            : "-"}
                        </td>

                        <td className="px-6 py-3 text-sm">
                          <div className="flex gap-2 items-center">
                            {/* EDIT BUTTON */}
                            <button
                              title="edit"
                              onClick={() => {
                                setSelectedStatus(item);
                                setIsUpdateOpen(true);
                              }}
                              className="p-1.5 border rounded text-gray-600 hover:bg-gray-50"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>

                            {/* DELETE BUTTON */}
                            <button
                              title="delete"
                              onClick={() => {
                                handleDeleteClick(item.id);
                                setSelectedStatus(item)
                              }
                              }
                              className="p-1.5 border rounded text-red-500 hover:bg-red-50"
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
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
