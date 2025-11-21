// "use client";

// import React, { useState } from "react";
// import {
//   Search,
//   Filter,
//   RefreshCw,
//   Plus,
//   ArrowUpDown,
//   Trash2,
//   Pencil,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { userService } from "@/services/UserService";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import ConfirmDialog from "@/components/ConfirmDialog";
// import { User } from "@/common/model";

// export default function UsersPage() {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isOpenDelete, setIsOpenDelete] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

//   const queryClient = useQueryClient();

//   const { data: userdata, isLoading: isLoadingUser } = useQuery({
//     queryKey: ["users", currentPage],
//     queryFn: () => userService.getAllUsers(currentPage),
//   });

//   const filteredUsers = userdata?.filter((u) =>
//     u.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const { mutate: deleteUser } = useMutation({
//     mutationKey: ["deleteUser"],
//     mutationFn: userService.deleteUser,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       toast.success("Successfully deleted user");
//       setIsOpenDelete(false);
//     },
//     onError: () => {
//       toast.error("Failed to delete user");
//       setIsOpenDelete(false);
//     },
//   });

//   function handleRefresh() {
//     queryClient.invalidateQueries({ queryKey: ["users"] });
//     toast.success("Users refreshed");
//   }

//   return (
//     <>
//       {selectedUserId !== null && isOpenDelete && (
//         <ConfirmDialog
//           isOpen={isOpenDelete}
//           onClose={() => setIsOpenDelete(false)}
//           onConfirm={() => deleteUser(selectedUserId)}
//           title="Delete User"
//           cancelText="Cancel"
//           description="Are you sure you want to delete this user?"
//           confirmText="Delete"
//         />
//       )}

//       <div className="max-w-7xl mx-auto px-4 py-4">
//         <div className="mb-6">
//           <div className="flex items-center space-x-3 mb-2">
//             <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
//               <svg
//                 className="w-5 h-5 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900">Users</h1>
//           </div>
//           <p className="text-gray-600">Manage all system users.</p>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-4 border-b border-gray-200">
//             <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//               <div className="flex flex-col sm:flex-row gap-3 flex-1">
//                 <div className="relative flex-1 max-w-md">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search by name..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                   />
//                 </div>

//                 <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
//                   <Filter className="w-4 h-4" />
//                   <span>Filters</span>
//                 </button>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={handleRefresh}
//                   className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm text-gray-700"
//                 >
//                   <RefreshCw className="w-4 h-4" />
//                   <span>Refresh</span>
//                 </button>

//                 <button
//                   onClick={() => router.push("/dashboard/users/add")}
//                   className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600"
//                 >
//                   <Plus className="w-4 h-4" />
//                   <span>Add User</span>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left">
//                     <button className="flex items-center space-x-1 text-xs font-medium text-gray-700 uppercase">
//                       <span>Name</span>
//                       <ArrowUpDown className="w-3 h-3" />
//                     </button>
//                   </th>
//                   <th className="px-6 py-3 text-left">Email</th>
//                   <th className="px-6 py-3 text-left">Phone</th>
//                   <th className="px-6 py-3 text-left">Role</th>
//                   <th className="px-6 py-3 text-left">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {isLoadingUser ? (
//                   <tr>
//                     <td
//                       colSpan={5}
//                       className="px-6 py-10 text-center text-gray-400"
//                     >
//                       Loading...
//                     </td>
//                   </tr>
//                 ) : filteredUsers?.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={5}
//                       className="px-6 py-10 text-center text-gray-400"
//                     >
//                       No users found.
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredUsers?.map((u) => (
//                     <tr key={u.id} className="border-b last:border-0">
//                       <td className="px-6 py-3">{u.name}</td>
//                       <td className="px-6 py-3">{u.email}</td>
//                       <td className="px-6 py-3">{u.phone || "-"}</td>
//                       <td className="px-6 py-3">{u.role?.role_name || "-"}</td>
//                       <td className="px-6 py-3">
//                         <div className="flex items-center gap-2">
//                           <button
//                             className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 text-gray-500"
//                             onClick={() =>
//                               router.push(`/dashboard/users/edit/${u.id}`)
//                             }
//                           >
//                             <Pencil className="w-4 h-4" />
//                           </button>

//                           <button
//                             onClick={() => {
//                               setSelectedUserId(u.id);
//                               setIsOpenDelete(true);
//                             }}
//                             className="p-1.5 rounded border border-gray-200 hover:bg-red-50 text-red-500"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-end gap-4 px-6 py-3 border-t text-sm">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((p) => p - 1)}
//               className="px-4 py-1 rounded border disabled:opacity-40 hover:bg-gray-50"
//             >
//               Prev
//             </button>

//             <span>Page {currentPage}</span>

//             <button
//               onClick={() => setCurrentPage((p) => p + 1)}
//               className="px-4 py-1 rounded border hover:bg-gray-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }