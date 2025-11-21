"use client";

import React from "react";
import { Button } from "@/common/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/shadcn/ui/dialog";
import { User } from "@/common/model";
import { userService } from "@/services/UserService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import FieldInfo from "@/components/FieldInfo";
import { updateUserValidation } from "@/common/validation/userSchema";
import { UpdateUserDto } from "@/common/dto/userDto";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}

export default function UpdateUser({ isOpen, setIsOpen, user }: Props) {
  const queryClient = useQueryClient();
//   const [roleId, setRoleId] = useState(user.roleId ?? 1);

  const { mutate: updateUser, isPending } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: (dto: UpdateUserDto) => userService.updateUser(user.id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully!");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });

  const form = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: "",
      phone: user.phone || "",
      address: user.address || "",
      roleId: user.roleId,
    },
    validators: {
      onChange: updateUserValidation,
    },
    onSubmit: ({ value }) => {
      updateUser({
        name: value.name,
        email: value.email,
        password: value.password || undefined,
        phone: value.phone || "",
        address: value.address || "",
        roleId: Number(value.roleId),
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {" "}
      <DialogContent className="sm:max-w-lg">
        {" "}
        <DialogHeader>
          {" "}
          <DialogTitle>Update User</DialogTitle>{" "}
        </DialogHeader>
        ```
        <form
          className="space-y-4 mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="name">
            {(field) => (
              <div>
                <label htmlFor="name" className="block font-medium mb-1">
                  Name
                </label>
                <input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Full name"
                  className="w-full border rounded px-3 py-2"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  Email
                </label>
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

          <form.Field name="password">
            {(field) => (
              <div>
                <label htmlFor="password" className="block font-medium mb-1">
                  Password
                </label>
                <input
                  id={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Leave blank to keep current"
                  className="w-full border rounded px-3 py-2"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="phone">
            {(field) => (
              <div>
                <label htmlFor="phone" className="block font-medium mb-1">
                  Phone
                </label>
                <input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Phone number"
                  className="w-full border rounded px-3 py-2"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="address">
            {(field) => (
              <div>
                <label htmlFor="address" className="block font-medium mb-1">
                  Address
                </label>
                <textarea
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Address"
                  rows={3}
                  className="w-full border rounded px-3 py-2"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="roleId">
            {(field) => (
              <div>
                <label htmlFor="roleId" className="block font-medium mb-1">
                  Role
                </label>
                <select
                  id={field.name}
                  value={field.state.value ?? 1}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(Number(e.target.value));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value={1}>Admin</option>
                  <option value={2}>User</option>
                  <option value={3}>Manager</option>
                </select>
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600">
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
