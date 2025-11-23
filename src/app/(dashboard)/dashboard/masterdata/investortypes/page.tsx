"use client";

import { useState } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  ArrowUpDown,
  UserCircle2,
  Pencil,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { investorTypeService } from "@/services/InvestortypeService";
import { InvestorType } from "@/common/model";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import UpdateInvestorType from "@/components/UpdateInvestorType";

export default function InvestorTypesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvestorType, setSelectedInvestorType] = useState<{
    name: string;
    id: number;
  } | null>(null);
  const [isOpenDelete, setIsopenDelete] = useState(false);
  const queryClient = useQueryClient();
  const [selectedInvestortype, setSelectedInvestortype] =
    useState<InvestorType | null>(null);
  const { mutate: deleteInvestorType } = useMutation({
    mutationKey: ["deleteInvestorType"],
    mutationFn: investorTypeService.deleteInvestorType,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["investorType"],
      });
      toast.success("Berhasil menghapus tipe investor");
      setIsopenDelete(false);
    },
    onError: () => {
      toast.error("Gagal menghapus tipe investor");
      setIsopenDelete(false);
    },
  });
  const [currentPage, setCurrentPage] = useState(1);

  function handleRefreshTypes() {
    queryClient.invalidateQueries({
      queryKey: ["investorType"],
    });
    toast.success("Data tipe investor diperbarui");
  }

  const { data } = useQuery({
    queryKey: ["investorTypeWithPagination", currentPage],
    queryFn: () => investorTypeService.getAllInvestorTypesWithPagination(currentPage),
  });

  const filteredData = data
    ? data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  return (
    <>
      {selectedInvestorType != null && isOpenDelete && (
        <ConfirmDialog
          isOpen={isOpenDelete}
          onClose={() => setIsopenDelete(false)}
          onConfirm={() => deleteInvestorType(selectedInvestorType!.id!)}
          title="Hapus Tipe Investor"
          cancelText="Batal"
          description={`Apakah kamu yakin ingin menghapus tipe ${selectedInvestorType?.name}?`}
          confirmText="Hapus"
        />
      )}
      {isUpdateOpen && selectedInvestortype && (
        <UpdateInvestorType
          investorType={selectedInvestortype}
          isOpen={isUpdateOpen}
          setIsOpen={setIsUpdateOpen}
        />
      )}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
              <UserCircle2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tipe Investor</h1>
              <p className="text-gray-600 text-sm">Atur kategori tipe investor beserta warnanya (Angel, VC, Private Equity, dll.).</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari tipe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleRefreshTypes}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Segarkan</span>
              </button>
              <button
                onClick={() =>
                  router.push("/dashboard/masterdata/investortypes/add")
                }
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Tipe</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <button className="flex items-center space-x-1 text-xs font-medium text-gray-700 uppercase tracking-wider hover:text-gray-900">
                      <span>ID</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">Nama Tipe</th>
                  <th className="px-6 py-3 text-left">Warna</th>
                  <th className="px-6 py-3 text-left">Tanggal Dibuat</th>
                  <th className="px-6 py-3 text-left">Tanggal Diperbarui</th>
                  <th className="px-6 py-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-6 py-3 text-sm text-gray-700">
                      {item.id}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full`}
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-800">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm font-mono text-gray-700">
                      {item.color}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-700">
                      {new Date(item.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          title="update"
                          className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-700"
                          onClick={() => {
                            setSelectedInvestortype(item);
                            setIsUpdateOpen(true);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          title="delete"
                          className="p-1.5 rounded border border-gray-200 hover:bg-red-50 text-red-500 hover:text-red-600"
                          onClick={() => {
                            setIsopenDelete(true);
                            setSelectedInvestorType({
                              id: item.id,
                              name: item.name,
                            });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredData?.length === 0 && (
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
                        <p className="text-gray-400 text-sm">Tidak ada tipe investor</p>
                      </div>
                    </td>
                  </tr>
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
