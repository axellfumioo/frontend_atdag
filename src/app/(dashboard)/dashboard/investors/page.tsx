"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  // Filter,
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
import { useSidebarLayout } from "@/components/LayoutClient";

export default function InvestorsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenDelete, setIsopenDelete] = useState(false);
  const queryClient = useQueryClient();
  const { sidebarCollapsed } = useSidebarLayout();
  const [currentPage, setCurrentPage] = useState(1);

  // const [isUpdateOpen, setIUpdateOpen] = useState(false)
  // const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(
  //   null
  // )
  const [selectedInvestorId, setSelectedInvestorId] = useState<number | null>(
    null
  );
  const { data: investordata, isLoading: isLoadingInvestor } = useQuery({
    queryKey: ["investorsWithPagination", currentPage],
    queryFn: () => investorService.getAllInvestorsWithPagination(currentPage),
  });

  const [selectedInvestor, setSelectedInvestor] = useState<Investor | null>(
    null
  );

  const { mutate: deleteInvestor } = useMutation({
    mutationKey: ["deleteInvestor"],
    mutationFn: investorService.deleteInvestor,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["investorsWithPagination"],
      });
      toast.success("Berhasil menghapus investor");
      setIsopenDelete(false);
    },
    onError: () => {
      toast.error("Gagal menghapus investor");
      setIsopenDelete(false);
    },
  });

  const filteredInvestors = investordata?.filter((inv) =>
    inv?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  function handleRefresh() {
    queryClient.invalidateQueries({
      queryKey: ["investorsWithPagination"],
    });
    toast.success("Data investor diperbarui");
  }

  const containerWidthClass = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed],
  );

  return (
    <>
      {selectedInvestorId != null && isOpenDelete && (
        <ConfirmDialog
          isOpen={isOpenDelete}
          onClose={() => setIsopenDelete(false)}
          onConfirm={() => deleteInvestor(selectedInvestorId)}
          title="Hapus Investor"
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
      <div className={`${containerWidthClass} mx-auto px-4 py-4 space-y-4`}>
        {/* Header Section */}
        <section className="rounded-2xl border border-yellow-100 bg-white/95 px-5 py-5 shadow-sm">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
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
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  Investor
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-gray-600">
                  Kelola hubungan investor dan informasi kontak mereka.
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
                    placeholder="Cari berdasarkan nama..."
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
                  onClick={handleRefresh}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Segarkan</span>
                </button>

                <button
                  onClick={() => router.push("/dashboard/investors/add")}
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Investor</span>
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
                      <span>Nama</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">Tipe</th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">Website</th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">Tanggal Dibuat</th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">Tanggal Diperbarui</th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingInvestor ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="px-6 py-3">
                        <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
                      </td>
                      <td className="px-6 py-3">
                        <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                      </td>
                      <td className="px-6 py-3">
                        <div className="h-4 w-36 bg-gray-100 rounded animate-pulse" />
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
                ) : !isLoadingInvestor && (filteredInvestors?.length ?? 0) === 0 ? (
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
                        <p className="text-gray-400 text-sm">Investor tidak ditemukan</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredInvestors?.map((inv) => (
                    <tr
                      key={inv.id}
                      className="group border-b border-gray-100 last:border-0 hover:bg-gray-50/80"
                    >
                      <td className="px-6 py-3 text-gray-800">
                        {inv.name}
                      </td>
                      <td className="px-6 py-3 text-gray-700">
                        <span
                          className="inline-flex items-center gap-2 rounded-full border px-2 py-0.5 text-xs"
                          style={{
                            borderColor: inv.investor_type?.color || "#E5E7EB",
                          }}
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: inv.investor_type?.color }}
                          />
                          <span>{inv.investor_type?.name || "-"}</span>
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        {inv.website ? (
                          <a
                            href={inv.website.startsWith("http") ? inv.website : `https://${inv.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 underline"
                          >
                            {inv.website}
                          </a>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-gray-600 whitespace-nowrap">
                        {new Date(inv.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-6 py-3 text-gray-600 whitespace-nowrap">
                        {new Date(inv.updated_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                          <button
                            title="update"
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-700"
                            onClick={() => {
                              setSelectedInvestor(inv);
                              setIsUpdateOpen(true);
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            title="delete"
                            onClick={() => {
                              setIsopenDelete(true);
                              setSelectedInvestorId(inv.id);
                            }}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-gray-200 hover:bg-red-50 text-red-500 hover:text-red-600"
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
