"use client";

import React, { useState } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  ArrowUpDown,
  Layers,
  Pencil,
  Trash2,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { investmentStageService } from "@/services/InvestmentStageService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ConfirmDialog";
import { InvestmentStage } from "@/common/model";
import UpdateInvestmentStage from "@/components/UpdateInvestmentStage";

export default function InvestmentStagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState<number | null>(null);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<InvestmentStage | null>(
    null
  );
  const {
    data: stages,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["investmentStagesWithPagination", currentPage],
    queryFn: () => investmentStageService.getInvestmentStagesWithPagination(currentPage),
  });

  const { mutate: deleteInvestmentStage } = useMutation({
    mutationKey: ["deleteInvestmentStage"],
    mutationFn: investmentStageService.deleteInvestmentStage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["investmentStages"],
      });
      toast.success("Berhasil menghapus tahapan investasi!");
      setIsDeleteOpen(false);
    },
    onError: () => {
      toast.error("Gagal menghapus tahapan investasi");
    },
  });

  const filteredStages = stages
    ? stages.filter((stage) =>
        stage.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleDelete = (id: number) => {
    deleteInvestmentStage(id);
  };

  function handleRefresh() {
    queryClient.invalidateQueries({
      queryKey: ["investmentStages"],
    });
    toast.success("Data tahapan diperbarui");
    refetch().then(() => {
      setCurrentPage(1);
    });
  }
  return (
    <>
      {isDeleteOpen && selectedStageId !== null && (
        <ConfirmDialog
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={() => handleDelete(selectedStageId)}
          title="Hapus Tahapan Investasi"
          description="Apakah kamu yakin ingin menghapus tahapan investasi ini?"
          confirmText="Hapus"
          cancelText="Batal"
        />
      )}
      {isUpdateOpen && selectedStage !== null && (
        <UpdateInvestmentStage
          isOpen={isUpdateOpen}
          setIsOpen={setIsUpdateOpen}
          investmentStage={selectedStage}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tahapan Investasi</h1>
              <p className="text-gray-600">Atur tahapan investasi secara berurutan (Pre-Seed, Seed, Series A, dll.).</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari tahapan..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleRefresh()}
                  className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Segarkan</span>
                </button>

                <button
                  onClick={() =>
                    router.push("/dashboard/masterdata/investmentstages/add")
                  }
                  className="flex items-center space-x-2 rounded-lg bg-yellow-500 px-4 py-2 text-sm text-white hover:bg-yellow-600"
                >
                  <Plus className="h-4 w-4" />
                  <span>Tambah Tahapan</span>
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    <button className="flex items-center space-x-1 hover:text-gray-900">
                      <span>Urutan</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    <button className="flex items-center space-x-1 hover:text-gray-900">
                      <span>Nama Tahapan</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    <button className="flex items-center space-x-1 hover:text-gray-900">
                      <span>Tanggal Dibuat</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    <button className="flex items-center space-x-1 hover:text-gray-900">
                      <span>Tanggal Diperbarui</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-sm text-gray-400"
                    >
                      Memuat...
                    </td>
                  </tr>
                ) : filteredStages.length === 0 ? (
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
                        <p className="text-gray-400 text-sm">Tidak ada tahapan</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStages.map((stage: InvestmentStage) => (
                    <tr
                      key={stage.id}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                    >
                      <td className="px-6 py-3 text-sm text-gray-900">
                        {stage.order}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-900">
                        {stage.name}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700">
                        {new Date(stage.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700">
                        {new Date(stage.updated_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-6 py-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <button
                            title="update"
                            onClick={() => {
                              setSelectedStage(stage);
                              setIsUpdateOpen(true);
                            }}
                            className="rounded border border-gray-200 p-1 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            title="delete"
                            onClick={() => {
                              setSelectedStageId(stage.id);
                              setIsDeleteOpen(true);
                            }}
                            className="rounded border border-gray-200 p-1 text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
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
