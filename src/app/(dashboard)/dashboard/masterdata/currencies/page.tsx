"use client";

import React, { useState } from "react";
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
      toast.success("Mata uang berhasil dihapus!");
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
        description="Apakah kamu yakin ingin menghapus mata uang ini?"
        title="Hapus Mata Uang"
      />
      {isUpdateOpen && selectedCurrency && (
        <UpdateCurrency
          currency={selectedCurrency}
          isOpen={isUpdateOpen}
          setIsOpen={setIsUpdateOpen}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
              <CircleDollarSign className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mata Uang</h1>
              <p className="text-gray-600 text-sm">Kelola mata uang yang digunakan untuk investasi dan pelacakan keuangan.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900">
                      <span>Urutan</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Kode
                    </span>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Simbol
                    </span>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Nama
                    </span>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900">
                      <span>Tanggal Dibuat</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900">
                      <span>Tanggal Diperbarui</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Aksi
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoadingCurrencies && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-sm text-gray-500">
                      Memuat mata uang...
                    </td>
                  </tr>
                )}

                {!isLoadingCurrencies && filteredCurrencies?.length === 0 && (
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
                )}

                {!isLoadingCurrencies &&
                  filteredCurrencies?.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 last:border-0"
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
                      <td className="px-6 py-3 text-sm text-gray-700">
                        {new Date(item.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700">
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
                  ))}
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
