"use client";

import React, { useState } from "react";
import { Button } from "@/common/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/shadcn/ui/dialog";
import { User } from "@/common/model";
import { userService } from "@/services/UserService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import FieldInfo from "@/components/FieldInfo";
import { updateUserValidation } from "@/common/validation/userSchema";
import { UpdateUserDto } from "@/common/dto/userDto";
import { roleService } from "@/services/RoleService";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}

export default function UpdateUser({ isOpen, setIsOpen, user }: Props) {
  const queryClient = useQueryClient();
  const {data: roleData} = useQuery({
    queryKey: ["roleData"],
    queryFn: roleService.getAllRole
  })

  const { mutate: updateUser, isPending } = useMutation({
    mutationKey: ["UpdateUser"],
    mutationFn: (dto: UpdateUserDto) => userService.updateUser(user.id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Pengguna berhasil diperbarui!");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Gagal memperbarui pengguna");
    },
  });

  const form = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
      roleId: user.role_id,
    },
    validators: {
      onChange: updateUserValidation,
    },
    onSubmit: ({ value }) => {
      updateUser({
        name: value.name,
        email: value.email,
        phone: value.phone || "",
        address: value.address || "",
        roleId: Number(value.roleId),
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Perbarui Pengguna</DialogTitle>
        </DialogHeader>

        <form
          className="space-y-4 mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          {/* NAME */}
          <form.Field name="name">
            {(field) => (
              <div>
                <label htmlFor="name" className="block font-medium mb-1">Nama</label>

                <input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Nama lengkap"

                  className="w-full border rounded px-3 py-2"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          {/* EMAIL + PHONE (ROW) */}
          <div className="flex gap-4">
            <form.Field name="email">
              {(field) => (
                <div className="flex-1">
                  <label htmlFor="email" className="block font-medium mb-1">Email</label>

                  <input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="user@example.com"

                    className="w-full border rounded px-3 py-2"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field name="phone">
              {(field) => (
                <div className="flex-1">
                  <label htmlFor="phone" className="block font-medium mb-1">Telepon</label>

                  <input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Nomor telepon"

                    className="w-full border rounded px-3 py-2"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>

          {/* ADDRESS (ROW SENDIRI) */}
          <form.Field name="address">
            {(field) => (
              <div>
                <label htmlFor="address" className="block font-medium mb-1">Alamat</label>

                <textarea
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Alamat"

                  rows={3}
                  className="w-full border rounded px-3 py-2"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          {/* ROLE */}
          <form.Field name="roleId">
            {(field) => (
              <div>
                <label htmlFor="roleId" className="block font-medium mb-1">Peran</label>

                <select
                  id={field.name}
                  value={Number(field.state.value)}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {roleData?.map((role) => (
                    <option key={role.id} value={role.id}>{role.role_name}</option>
                  ))}

                </select>
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          {/* BUTTONS */}
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600">
              {isPending ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>

          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}