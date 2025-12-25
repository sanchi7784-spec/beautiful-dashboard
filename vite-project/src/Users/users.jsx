import React, { useState } from "react";
import { SearchCode } from 'lucide-react';
import { ArrowBigDownDash } from 'lucide-react';
const usersData = [
  { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210", status: "Active" },
  { id: 2, name: "Anjali Verma", email: "anjali@gmail.com", phone: "9123456789", status: "Inactive" },
  { id: 3, name: "Aman Singh", email: "aman@gmail.com", phone: "9012345678", status: "Active" },
  { id: 4, name: "Aman Singh", email: "aman@gmail.com", phone: "9012345678", status: "Active" },
  { id: 5, name: "Aman Singh", email: "aman@gmail.com", phone: "9012345678", status: "Active" },
  { id: 6, name: "Aman Singh", email: "aman@gmail.com", phone: "9012345678", status: "Active" },
  { id: 7, name: "Aman Singh", email: "aman@gmail.com", phone: "9012345678", status: "Active" },
];

const Users = () => {
  const [users, setUsers] = useState(usersData);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const openView = (user) => {
    setSelectedUser(user);
    setViewOpen(true);
  };

  const openEdit = (user) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    setUsers(users.map(u => (u.id === selectedUser.id ? selectedUser : u)));
    setEditOpen(false);
  };
  const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [openStatus, setOpenStatus] = useState(false);


const filteredUsers = users.filter((user) => {
  const matchesSearch =
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.phone.includes(search);

  const matchesStatus =
    statusFilter === "All" || user.status === statusFilter;

  return matchesSearch && matchesStatus;
});
const [addOpen, setAddOpen] = useState(false);

const [newUser, setNewUser] = useState({
  name: "",
  email: "",
  phone: "",
  status: "Active",
});
const handleAddChange = (e) => {
  setNewUser({ ...newUser, [e.target.name]: e.target.value });
};

const addUser = () => {
  if (!newUser.name || !newUser.email || !newUser.phone) return;

  const userToAdd = {
    id: users.length + 1,
    ...newUser,
  };

  setUsers([...users, userToAdd]);
  setNewUser({ name: "", email: "", phone: "", status: "Active" });
  setAddOpen(false);
};

  return (
    <div className="bg-black dark:bg-gray-900 shadow-xl rounded-2xl mt-20">
 <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

  {/* Search Input */}
  <div className="relative w-full sm:max-w-md">
    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
      <SearchCode />
    </span>
    <input
      type="text"
      placeholder="Search users..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-2xl bg-gradient-to-b from-black via-gray-900 to-black
                 border border-white/10
                 pl-11 pr-4 py-3 text-sm text-white
                 placeholder-gray-500
                 focus:outline-none focus:ring-2 focus:ring-blue-500/40
                 transition"
    />
  </div>

  {/* Right Filters */}
  <div className="flex gap-3 w-full sm:w-auto">

    {/* Status Dropdown */}
<div className="relative w-full sm:w-48">
  <button
    onClick={() => setOpenStatus(!openStatus)}
    className="flex w-full items-center justify-between rounded-2xl
               bg-gradient-to-b from-black via-gray-900 to-black
               border border-white/10 px-4 py-3 text-sm text-white
               hover:bg-white/5 transition"
  >
    <span>
      {statusFilter === "All" ? "All Status" : statusFilter}
    </span>
    <span className="text-gray-400">  <ArrowBigDownDash /></span>
  </button>

  {openStatus && (
    <div className="absolute z-50 mt-2 w-full rounded-xl
                    border border-white/10 bg-black shadow-xl overflow-hidden">

      {["All", "Active", "Inactive"].map((status) => (
        <button
          key={status}
          onClick={() => {
            setStatusFilter(status);
            setOpenStatus(false);
          }}
          className={`flex w-full items-center justify-between px-4 py-2.5 
                      text-sm text-left transition
            ${
              statusFilter === status
                ? "bg-blue-500/15 text-blue-400"
                : "text-gray-300 hover:bg-white/5"
            }`}
        >
          {status}
          {statusFilter === status && <span>✔</span>}
        </button>
      ))}
    </div>
  )}
</div>

  </div>
  <button
  onClick={() => setAddOpen(true)}
  className="rounded-2xl bg-gradient-to-r from-gray-900 via-black to-gray-900 px-5 py-2.5 text-sm font-medium 
             text-white hover:bg-blue-500 transition shadow-lg"
>
  + Add User
</button>

</div>



      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        Users List
        
      </h2>

     <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-xl">
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      
      {/* Table Head */}
      <thead>
        <tr className="bg-gradient-to-r from-gray-900 via-black to-gray-900 
                       text-xs uppercase tracking-wider text-gray-400 
                       border-b border-white/10">
          <th className="px-6 py-4 text-left font-medium">ID</th>
          <th className="px-6 py-4 text-left font-medium">User</th>
          <th className="px-6 py-4 text-left font-medium">Email</th>
          <th className="px-6 py-4 text-left font-medium">Phone</th>
          <th className="px-6 py-4 text-left font-medium">Status</th>
          <th className="px-6 py-4 text-left font-medium">Actions (hover to see)</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {filteredUsers.map((user) => (
          <tr
            key={user.id}
            className="group border-b border-white/5 
                       hover:bg-white/[0.03] transition-all"
          >
            {/* ID */}
            <td className="px-6 py-4 text-sm text-gray-400">
              #{user.id}
            </td>

            {/* Name */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full 
                                bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                                flex items-center justify-center 
                                text-xs font-semibold text-white">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-white">
                  {user.name}
                </span>
              </div>
            </td>

            {/* Email */}
            <td className="px-6 py-4 text-sm text-gray-300">
              {user.email}
            </td>

            {/* Phone */}
            <td className="px-6 py-4 text-sm text-gray-300">
              {user.phone}
            </td>

            {/* Status */}
            <td className="px-6 py-4">
              <span
                className={`inline-flex items-center gap-1.5 
                            rounded-full px-3 py-1 text-xs font-medium
                  ${
                    user.status === "Active"
                      ? "bg-green-500/15 text-green-400"
                      : "bg-red-500/15 text-red-400"
                  }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full
                    ${
                      user.status === "Active"
                        ? "bg-green-400"
                        : "bg-red-400"
                    }`}
                />
                {user.status}
              </span>
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-2 opacity-0 
                              group-hover:opacity-100 transition">
                <button
                  onClick={() => openView(user)}
                  className="rounded-lg border border-white/10 
                             px-3 py-1.5 text-xs text-gray-300 
                             hover:bg-white/10 transition"
                >
                  View
                </button>
                <button
                  onClick={() => openEdit(user)}
                  className="rounded-lg border border-blue-500/30 
                             px-3 py-1.5 text-xs text-blue-400 
                             hover:bg-blue-500/10 transition"
                >
                  Edit
                </button>
                <button
                  className="rounded-lg border border-red-500/30 
                             px-3 py-1.5 text-xs text-red-400 
                             hover:bg-red-500/10 transition"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      {/* VIEW MODAL */}
    {viewOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm">
    
    {/* Modal Card */}
    <div className="relative w-full max-w-lg rounded-2xl 
                    border border-white/10 
                    bg-gradient-to-b from-gray-900 via-black to-gray-900 
                    shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white tracking-wide">
          User Details
        </h3>
        <button
          onClick={() => setViewOpen(false)}
          className="text-gray-400 hover:text-white transition"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-6 space-y-4">
        {/* Info Row */}
        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-xs text-gray-400">User ID</span>
          <span className="text-sm text-white font-medium">
            #{selectedUser.id}
          </span>
        </div>

        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-xs text-gray-400">Full Name</span>
          <span className="text-sm text-white font-medium">
            {selectedUser.name}
          </span>
        </div>

        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-xs text-gray-400">Email Address</span>
          <span className="text-sm text-white font-medium">
            {selectedUser.email}
          </span>
        </div>

        <div className="flex justify-between border-b border-white/5 pb-2">
          <span className="text-xs text-gray-400">Phone Number</span>
          <span className="text-sm text-white font-medium">
            {selectedUser.phone}
          </span>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-gray-400">Status</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
              ${
                selectedUser.status === "Active"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
          >
            {selectedUser.status}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/10">
        <button
          onClick={() => setViewOpen(false)}
          className="w-full rounded-xl bg-white/5 
                     py-2.5 text-sm text-gray-200 
                     hover:bg-white/10 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


      {/* EDIT MODAL */}
    {editOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm">
    
    {/* Modal Card */}
    <div className="relative w-full max-w-lg rounded-2xl border border-white/10 
                    bg-gradient-to-b from-gray-900 via-black to-gray-900 
                    shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white tracking-wide">
          Edit User
        </h3>
        <button
          onClick={() => setEditOpen(false)}
          className="text-gray-400 hover:text-white transition"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-4">
        {/* Name */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">
            Full Name
          </label>
          <input
            name="name"
            value={selectedUser.name}
            onChange={handleEditChange}
            className="w-full rounded-xl bg-black/60 border border-white/10 
                       px-4 py-2.5 text-sm text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            placeholder="Enter name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">
            Email Address
          </label>
          <input
            name="email"
            value={selectedUser.email}
            onChange={handleEditChange}
            className="w-full rounded-xl bg-black/60 border border-white/10 
                       px-4 py-2.5 text-sm text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            placeholder="Enter email"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">
            Phone Number
          </label>
          <input
            name="phone"
            value={selectedUser.phone}
            onChange={handleEditChange}
            className="w-full rounded-xl bg-black/60 border border-white/10 
                       px-4 py-2.5 text-sm text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            placeholder="Enter phone"
          />
        </div>

        {/* Status */}
        <div>
          <label className="text-xs text-gray-400 mb-1 block">
            Status
          </label>
          <select
            name="status"
            value={selectedUser.status}
            onChange={handleEditChange}
            className="w-full rounded-xl bg-black/60 border border-white/10 
                       px-4 py-2.5 text-sm text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option className="bg-black">Active</option>
            <option className="bg-black">Inactive</option>
          </select>
        </div>
      </div>

      {/* Footer */}
      <div className="flex gap-3 px-6 py-4 border-t border-white/10">
        <button
          onClick={() => setEditOpen(false)}
          className="w-1/2 rounded-xl border border-white/10 
                     py-2.5 text-sm text-gray-300 
                     hover:bg-white/5 transition"
        >
          Cancel
        </button>

        <button
          onClick={saveEdit}
          className="w-1/2 rounded-xl bg-blue-600 
                     py-2.5 text-sm font-medium text-white 
                     hover:bg-blue-500 transition shadow-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
)}

{addOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center 
                  bg-black/80 backdrop-blur-sm">

    <div className="relative w-full max-w-lg rounded-2xl 
                    border border-white/10 
                    bg-gradient-to-b from-gray-900 via-black to-gray-900 
                    shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 
                      border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">
          Add New User
        </h3>
        <button
          onClick={() => setAddOpen(false)}
          className="text-gray-400 hover:text-white transition"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-4">

        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Full Name
          </label>
          <input
            name="name"
            value={newUser.name}
            onChange={handleAddChange}
            placeholder="Enter full name"
            className="w-full rounded-xl bg-black/60 border border-white/10 
                       px-4 py-2.5 text-sm text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Email Address
          </label>
          <input
            name="email"
            value={newUser.email}
            onChange={handleAddChange}
            placeholder="Enter email"
            className="w-full rounded-xl bg-black/60 border border-white/10 
                       px-4 py-2.5 text-sm text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Phone Number
          </label>
          <input
            name="phone"
            value={newUser.phone}
            onChange={handleAddChange}
            placeholder="Enter phone"
            className="w-full rounded-xl bg-black/60 border border-white/10 
                       px-4 py-2.5 text-sm text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 block mb-1">
            Status
          </label>
          <select
            name="status"
            value={newUser.status}
            onChange={handleAddChange}
            className="w-full rounded-xl bg-black/60 border border-white/10 
                       px-4 py-2.5 text-sm text-white 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option className="bg-black">Active</option>
            <option className="bg-black">Inactive</option>
          </select>
        </div>

      </div>

      {/* Footer */}
      <div className="flex gap-3 px-6 py-4 border-t border-white/10">
        <button
          onClick={() => setAddOpen(false)}
          className="w-1/2 rounded-xl border border-white/10 
                     py-2.5 text-sm text-gray-300 hover:bg-white/5 transition"
        >
          Cancel
        </button>
        <button
          onClick={addUser}
          className="w-1/2 rounded-xl bg-blue-600 
                     py-2.5 text-sm font-medium text-white 
                     hover:bg-blue-500 transition shadow-lg"
        >
          Add User
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Users;
