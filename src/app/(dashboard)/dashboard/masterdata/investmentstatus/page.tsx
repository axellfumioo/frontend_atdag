"use client";

import React, { useState } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  Tag,
  Pencil,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { investmentStatusService } from "@/services/InvestmentStatusService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ConfirmDialog";
import { InvestmentStatus } from "@/common/model";
import UpdateInvestmentStatus from "@/components/UpdateInvestmentStatus"; 

export default function InvestmentStatusPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // NEW STATES for Editing
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<InvestmentStatus | null>(null);

  const { data: statuses , isLoading, refetch } = useQuery({
    queryKey: ["investmentStatuses", currentPage],
    queryFn: () => investmentStatusService.getAllInvestmentStatus(currentPage),
  });

  const { mutate: deleteInvestmentStatus } = useMutation({
    mutationKey: ["deleteInvestmentStatus"],
    mutationFn: investmentStatusService.deleteInvestmentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["investmentStatuses"],
      });
      toast.success("Investment Status deleted successfully!");
      setIsDeleteOpen(false);
    },
    onError: () => {
      toast.error("Failed to delete Investment Status");
    },
  });

  const handleDelete = (id: number) => {
    deleteInvestmentStatus(id);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
  };

  // const filteredStatuses = statuses?.filter((item) =>
  //   item.status_name.toLowerCase().includes(searchQuery.toLowerCase())
  // ) : [];

  const filteredStatuses = statuses? statuses.filter((item) => 
    item.status_name.toLowerCase().includes(searchQuery.toLowerCase())
 ) : [];

  const statusColors: Record<string, string> = {
    Open: "bg-green-100 text-green-800",
    Closed: "bg-blue-100 text-blue-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <>
      {/* DELETE DIALOG */}
      {isDeleteOpen && selectedId !== null && (
        <ConfirmDialog
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={() => handleDelete(selectedId)}
          title="Delete Investment Status"
          description="Are you sure you want to delete this Investment Status?"
          confirmText="Delete"
          cancelText="Cancel"
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

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-6 flex items-center space-x-3">
          <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
            <Tag className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Investment Status</h1>
            <p className="text-gray-600 text-sm">
              Atur kategori status investasi lengkap dengan warna.
            </p>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Controls */}
          <div className="p-4 border-b border-gray-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => refetch()}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>

              <button
                onClick={() =>
                  router.push("/dashboard/masterdata/investmentstatus/add")
                }
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Status
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Order</th>
                  <th className="px-6 py-3 text-xs uppercase">Name</th>
                  <th className="px-6 py-3 text-xs uppercase">Color</th>
                  <th className="px-6 py-3 text-xs uppercase">Status Type</th>
                  <th className="px-6 py-3">Date Created</th>
                  <th className="px-6 py-3">Date Updated</th>
                  <th className="px-6 py-3 text-xs uppercase">Actions</th>
                </tr>
              </thead>

              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={7} className="text-center py-10">
                      Loading data...
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  filteredStatuses?.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-6 py-3">{item.order}</td>

                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: item.status_color }}
                          />
                          {item.status_name}
                        </div>
                      </td>

                      <td className="px-6 py-3 font-mono">
                        {item.status_color}
                      </td>

                      <td className="px-6 py-3">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            statusColors[item.status_type] ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {item.status_type}
                        </span>
                      </td>

                      <td className="px-6 py-3">
                        {new Date(item.created_at).toLocaleDateString("id-ID")}
                      </td>

                      <td className="px-6 py-3">
                        {new Date(item.updated_at).toLocaleDateString("id-ID")}
                      </td>

                      <td className="px-6 py-3">
                        <div className="flex gap-2">

                          {/* EDIT BUTTON */}
                          <button
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
                            onClick={() => handleDeleteClick(item.id)}
                            className="p-1.5 border rounded text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                {!isLoading && filteredStatuses.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-gray-400">
                      Tidak ada status ditemukan.
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
              Prev
            </button>

            <span>Page {currentPage}</span>

            <button
              className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}