"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createUserValidation } from "@/common/validation/userSchema";
import { userService } from "@/services/UserService";
import FieldInfo from "@/components/FieldInfo";

export default function AddUserPage() {
  const router = useRouter();

  const { mutate: createUser, isPending } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: userService.createUser,
    onSuccess: () => {
      toast.success("Berhasil membuat pengguna!");
      router.push("/dashboard/users");
    },
    onError: () => {
      toast.error("Gagal membuat pengguna");
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      roleId: 1, // default Admin
    },
    validators: {
      onChange: createUserValidation,
    },
    onSubmit: ({ value }) => {
      // pastikan backend menerima role_Id
      createUser({
        name: value.name,
        email: value.email,
        password: value.password,
        phone: value.phone || "",
        address: value.address || "",
        role_Id: Number(value.roleId),
      });
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.push("/dashboard/users")}
        className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Kembali ke Pengguna{" "}
      </button>
      {/* Heading */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-yellow-500 rounded-md flex items-center justify-center">
          <UserPlus className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Tambah Pengguna</h1>
      </div>
      {/* Form */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <form.Field name="name">
              {(field) => (
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-700">Nama</label>
                  <input
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Email */}
            <form.Field name="email">
              {(field) => (
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Password */}
            <form.Field name="password">
              {(field) => (
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-700">Kata Sandi</label>
                  <input
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Phone */}
            <form.Field name="phone">
              {(field) => (
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-700">Telepon</label>
                  <input
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Role */}
            <form.Field name="roleId">
              {(field) => (
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-700">Peran</label>
                  <select
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    <option value="1">Admin</option>
                    <option value="2">Pengguna</option>
                    <option value="3">Manajer</option>
                  </select>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            {/* Address */}
            <form.Field name="address">
              {(field) => (
                <div className="flex flex-col space-y-1 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Alamat</label>
                  <textarea
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/users")}
              className="px-5 py-2.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2.5 text-sm bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              {isPending ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
