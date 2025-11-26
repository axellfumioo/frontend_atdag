"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  Plus,
  ArrowUpDown,
  Trash2,
  Pencil,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { userService } from "@/services/UserService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ConfirmDialog";
import UpdateUser from "@/components/UpdateUser";
import { User } from "@/common/model";
import { useSidebarLayout } from "@/components/LayoutClient";

export default function UsersPage() {
const router = useRouter();
const queryClient = useQueryClient();
  const [selectedUserIni, setSelectedUserIni] =
    useState<User | null>(null);

const [searchQuery, setSearchQuery] = useState("");
const [isOpenDelete, setIsOpenDelete] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

const [isUpdateOpen, setIsUpdateOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState<User | null>(null);
const { sidebarCollapsed } = useSidebarLayout();

// GET USERS
const { data: userdata, isLoading: isLoadingUser } = useQuery({
queryKey: ["users", currentPage],
queryFn: () => userService.getAllUser(currentPage),
});

// SEARCH
const filteredUsers = userdata?.filter((u) =>
[u.name, u.email, u.phone]
.filter(Boolean)
.some((value) =>
value!.toLowerCase().includes(searchQuery.toLowerCase())
)
);

// DELETE USER
const { mutate: deleteUser } = useMutation({
mutationKey: ["deleteUser"],
mutationFn: (id: number) => userService.deleteUser(id),
onSuccess: () => {
queryClient.invalidateQueries({ queryKey: ["users"] });
toast.success(`Berhasil menghapus pengguna ${selectedUserIni?.name}`);
setIsOpenDelete(false);
},
onError: () => {
toast.error("Gagal menghapus pengguna");
setIsOpenDelete(false);
},
});

function handleRefresh() {
queryClient.invalidateQueries({ queryKey: ["users"] });
toast.success("Data pengguna diperbarui");
}

return (
<>
{/* Delete Confirm Dialog */}
{selectedUserId !== null && isOpenDelete && (
<ConfirmDialog
isOpen={isOpenDelete}
onClose={() => setIsOpenDelete(false)}
onConfirm={() => deleteUser(selectedUserId)}
title="Hapus Pengguna"
cancelText="Batal"
description={`Apakah kamu yakin ingin menghapus pengguna ${selectedUserIni?.name}`}
confirmText="Hapus"
/>
)}

  {/* Update User Modal */}
  {selectedUser && isUpdateOpen && (
    <UpdateUser
      user={selectedUser}
      isOpen={isUpdateOpen}
      setIsOpen={setIsUpdateOpen}
    />
  )}

  <div className={`${useMemo(() => (sidebarCollapsed ? "max-w-screen-2xl" : "max-w-7xl"), [sidebarCollapsed])} mx-auto px-4 py-4 space-y-4`}>
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Pengguna
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              Kelola seluruh pengguna dan akses sistem.
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
      {/* Header: Search + Buttons */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari pengguna..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm text-gray-700"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Segarkan</span>
            </button>

            <button
              onClick={() => router.push("/dashboard/users/add")}
              className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Pengguna</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto max-h-[70vh]">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/75 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <button className="flex items-center space-x-1 text-[11px] font-medium text-gray-600 uppercase tracking-wide hover:text-gray-900">
                  <span>Nama</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">Email</th>
              <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">Telepon</th>
              <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">Alamat</th>
              <th className="px-6 py-3 text-left text-[11px] font-medium text-gray-600 uppercase tracking-wide">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {isLoadingUser ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  <td className="px-6 py-3"><div className="h-4 w-40 bg-gray-100 rounded animate-pulse" /></td>
                  <td className="px-6 py-3"><div className="h-4 w-56 bg-gray-100 rounded animate-pulse" /></td>
                  <td className="px-6 py-3"><div className="h-4 w-28 bg-gray-100 rounded animate-pulse" /></td>
                  <td className="px-6 py-3"><div className="h-4 w-64 bg-gray-100 rounded animate-pulse" /></td>
                  <td className="px-6 py-3"><div className="h-6 w-20 bg-gray-100 rounded animate-pulse" /></td>
                </tr>
              ))
            ) : filteredUsers?.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-gray-400"
                >
                  Tidak ada pengguna.
                </td>
              </tr>
            ) : (
              filteredUsers?.map((u) => (
                <tr key={u.id} className="group border-b border-gray-100 last:border-0 hover:bg-gray-50/80">
                  <td className="px-6 py-3">{u.name}</td>
                  <td className="px-6 py-3">{u.email}</td>
                  <td className="px-6 py-3">{u.phone || "-"}</td>
                  <td className="px-6 py-3">{u.address || "-"}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2 ">
                      <button
                        className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 text-gray-500"
                        onClick={() => {
                          setSelectedUser(u);
                          setIsUpdateOpen(true);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedUserId(u.id);
                          setSelectedUserIni(u)
                          setIsOpenDelete(true);
                        }}
                        className="p-1.5 rounded border border-gray-200 hover:bg-red-50 text-red-500"
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

      {/* Pagination */}
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
