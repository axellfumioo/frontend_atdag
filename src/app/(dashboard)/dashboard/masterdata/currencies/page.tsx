"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  ArrowUpDown,
  CircleDollarSign,
  Pencil,
  Trash2,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { currencyService } from "@/services/CurrencyService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Currency } from "@/common/model";
import UpdateCurrency from "@/components/UpdateCurrency";
import { useSidebarLayout } from "@/components/LayoutClient";

export default function CurrenciesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [currencyToDelete, setCurrencyToDelete] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { sidebarCollapsed } = useSidebarLayout();
  const {
    data: currencies,
    isLoading: isLoadingCurrencies,
    isSuccess: isSuccessCurrencies,
  } = useQuery({
    queryKey: ["currenciesWithPagination", currentPage],
    queryFn: () => currencyService.getAllCurrenciesWithpagination(currentPage),
  });

  const { mutate: deleteCurrency } = useMutation({
    mutationKey: ["deleteCurrency"],
    mutationFn: currencyService.deleteCurrency,
    onSuccess: () => {
      toast.success(`Mata uang ${selectedCurrency?.name} berhasil dihapus!`);
      queryClient.invalidateQueries({
        queryKey: ["currencies"],
      });
      setIsOpen(false);
    },
  });

  // const filteredData = CURRENCIES_DATA.filter((item) => {
  //   const q = searchQuery.toLowerCase();
  //   return (
  //     item.code.toLowerCase().includes(q) ||
  //     item.name.toLowerCase().includes(q) ||
  //     item.symbol.toLowerCase().includes(q)
  //   );
  // });

  function handleRefresh() {
    queryClient.invalidateQueries({
      queryKey: ["currencies"],
    });
    toast.success("Data mata uang diperbarui");
  }

  const containerWidthClass = useMemo(
    () => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"),
    [sidebarCollapsed],
  );

  const filteredCurrencies = currencies
    ? currencies.filter((item) => {
        const q = searchQuery.toLowerCase();
        return (
          item.code.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          (item.symbol?.toLowerCase() || "").includes(q)
        );
      })
    : [];

  return (
    <>
      <ConfirmDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          if (currencyToDelete) {
            deleteCurrency(currencyToDelete);
          }
        }}
        cancelText="Batal"
        confirmText="Hapus"
        description={`Apakah kamu yakin ingin menghapus mata uang ${selectedCurrency?.name}?`}
        title="Hapus Mata Uang"
      />
      {isUpdateOpen && selectedCurrency && (
        <UpdateCurrency
          currency={selectedCurrency}
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
                <CircleDollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  Mata Uang
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-gray-600">
                  Kelola mata uang yang digunakan untuk investasi dan pelacakan keuangan.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-100 bg-white px-3 py-1 text-xs font-medium text-gray-600">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]" />
              Data tersinkronisasi
            </div>
          </header>
        </section>

        <div className="bg-white rounded-2xl shadow-sm border border-yellow-100 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari mata uang..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Segarkan</span>
              </button>
              <button
                onClick={() => {
                  router.push("/dashboard/masterdata/currencies/add");
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Mata Uang</span>
              </button>
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/75 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-[11px] font-medium text-gray-600 uppercase tracking-wide hover:text-gray-900">
                      <span>Urutan</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">Kode</th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">Simbol</th>
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">Nama</th>
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
                  <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingCurrencies ? (
                  Array.from({ length: 10 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="px-6 py-3"><div className="h-4 w-14 bg-gray-100 rounded animate-pulse" /></td>
                      <td className="px-6 py-3"><div className="h-4 w-20 bg-gray-100 rounded animate-pulse" /></td>
                      <td className="px-6 py-3"><div className="h-4 w-16 bg-gray-100 rounded animate-pulse" /></td>
                      <td className="px-6 py-3"><div className="h-4 w-40 bg-gray-100 rounded animate-pulse" /></td>
                      <td className="px-6 py-3"><div className="h-4 w-28 bg-gray-100 rounded animate-pulse" /></td>
                      <td className="px-6 py-3"><div className="h-4 w-28 bg-gray-100 rounded animate-pulse" /></td>
                      <td className="px-6 py-3"><div className="h-6 w-20 bg-gray-100 rounded animate-pulse" /></td>
                    </tr>
                  ))
                ) : filteredCurrencies?.length === 0 ? (
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
                        <p className="text-gray-400 text-sm">Tidak ada mata uang</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCurrencies?.map((item) => (
                    <tr
                      key={item.id}
                      className="group border-b border-gray-100 last:border-0 hover:bg-gray-50/80"
                    >
                      <td className="px-6 py-3 text-sm text-gray-700">
                        {item.order}
                      </td>
                      <td className="px-6 py-3 text-sm font-semibold text-gray-800">
                        {item.code}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700">
                        {item.symbol}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700">
                        {item.name}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                        {new Date(item.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700 whitespace-nowrap">
                        {new Date(item.updated_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            title="update"
                            onClick={() => {
                              setSelectedCurrency(item);
                              setIsUpdateOpen(true);
                            }}
                            className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-700"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>

                          <button
                            title="delete"
                            onClick={() => {
                              setSelectedCurrency(item)
                              setIsOpen(true);
                              setCurrencyToDelete(item.id);
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
