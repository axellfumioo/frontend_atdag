// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import { ArrowLeft, UserPlus } from "lucide-react";
// import { userService } from "@/services/UserService";
// import { toast } from "sonner";
// import { useForm } from "@tanstack/react-form";
// import FieldInfo from "@/components/FieldInfo";
// import { useMutation } from "@tanstack/react-query";
// import { createUserValidation } from "@/common/validation/userSchema";

// export default function AddUserPage() {
//   const router = useRouter();

//   const { mutate: createUser, isPending } = useMutation({
//     mutationKey: ["createUser"],
//     mutationFn: userService.createUser,
//     onSuccess: () => {
//       toast.success("Successfully created user");
//       router.push("/dashboard/users");
//     },
//     onError: () => {
//       toast.error("Failed to create user");
//     },
//   });

//   const form = useForm({
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       phone: "",
//       address: "",
//     },
//     validators: { onChange: createUserValidation },
//     onSubmit: async ({ value }) => {
//       createUser(value);
//     },
//   });

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-4">
//       <button
//         type="button"
//         onClick={() => router.push("/dashboard/users")}
//         className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
//       >
//         <ArrowLeft className="w-4 h-4 mr-1" />
//         Back to Users
//       </button>

//       <div className="flex items-center gap-3 mb-6">
//         <div className="w-10 h-10 bg-yellow-500 rounded-md flex items-center justify-center">
//           <UserPlus className="w-5 h-5 text-white" />
//         </div>
//         <h1 className="text-3xl font-bold text-gray-900">Add User</h1>
//       </div>

//       <div className="bg-white p-8 rounded-lg shadow border">
//         <form
//           className="space-y-8"
//           onSubmit={(e) => {
//             e.preventDefault();
//             form.handleSubmit();
//           }}
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <form.Field name="name">
//               {(field) => (
//                 <div className="flex flex-col gap-1">
//                   <label>Name</label>
//                   <input
//                     value={field.state.value}
//                     onBlur={field.handleBlur}
//                     onChange={(e) => field.handleChange(e.target.value)}
//                     type="text"
//                     required
//                     className="input"
//                   />
//                   <FieldInfo field={field} />
//                 </div>
//               )}
//             </form.Field>

//             <form.Field name="email">
//               {(field) => (
//                 <div className="flex flex-col gap-1">
//                   <label>Email</label>
//                   <input
//                     value={field.state.value}
//                     onBlur={field.handleBlur}
//                     onChange={(e) => field.handleChange(e.target.value)}
//                     type="email"
//                     required
//                     className="input"
//                   />
//                   <FieldInfo field={field} />
//                 </div>
//               )}
//             </form.Field>

//             <form.Field name="password">
//               {(field) => (
//                 <div className="flex flex-col gap-1">
//                   <label>Password</label>
//                   <input
//                     value={field.state.value}
//                     onBlur={field.handleBlur}
//                     onChange={(e) => field.handleChange(e.target.value)}
//                     type="password"
//                     required
//                     className="input"
//                   />
//                   <FieldInfo field={field} />
//                 </div>
//               )}
//             </form.Field>

//             <form.Field name="phone">
//               {(field) => (
//                 <div className="flex flex-col gap-1">
//                   <label>Phone</label>
//                   <input
//                     value={field.state.value}
//                     onBlur={field.handleBlur}
//                     onChange={(e) => field.handleChange(e.target.value)}
//                     type="text"
//                     className="input"
//                   />
//                   <FieldInfo field={field} />
//                 </div>
//               )}
//             </form.Field>

//             <form.Field name="address">
//               {(field) => (
//                 <div className="flex flex-col gap-1 md:col-span-2">
//                   <label>Address</label>
//                   <textarea
//                     value={field.state.value}
//                     onBlur={field.handleBlur}
//                     onChange={(e) => field.handleChange(e.target.value)}
//                     className="input h-28 resize-none"
//                   />
//                   <FieldInfo field={field} />
//                 </div>
//               )}
//             </form.Field>
//           </div>

//           <div className="flex justify-end gap-4">
//             <button
//               type="button"
//               onClick={() => router.push("/dashboard/users")}
//               className="btn-outline"
//             >
//               Cancel
//             </button>
//             <button type="submit" disabled={isPending} className="btn-yellow">
//               {isPending ? "Saving..." : "Save User"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
