import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import UserModal from "./UserModal";
import API_BASE_URL from "../../../config/api";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/getAllusers`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Add or Update user
  const handleSave = async (userData) => {
    try {
      const url = editingUser
        ? `${API_BASE_URL}/user/update/${editingUser._id}`
        : `${API_BASE_URL}/user/addUser`;
      const method = editingUser ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!res.ok) throw new Error("Failed to save user");

      await getAllUsers();
      setShowModal(false);
      setEditingUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/user/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      await getAllUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Search
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = users.filter(
      (u) =>
        u.Name?.toLowerCase().includes(term.toLowerCase()) ||
        u.Email?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Sorting
  const handleSort = (field) => {
    if (!field) {
      setFilteredUsers(users);
      setSortField("");
      return;
    }

    let order = "asc";
    if (field === sortField && sortOrder === "asc") order = "desc";
    setSortField(field);
    setSortOrder(order);

    const sorted = [...filteredUsers].sort((a, b) => {
      const valA = a[field]?.toLowerCase();
      const valB = b[field]?.toLowerCase();

      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredUsers(sorted);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 text-center sm:text-left">
          All Users
        </h1>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* 🔍 Search */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 w-full sm:w-56"
          />

          {/* ↕️ Sort */}
          <select
            value={sortField}
            onChange={(e) => handleSort(e.target.value)}
            className="border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 w-full sm:w-40"
          >
            <option value="">Sort by</option>
            <option value="Name">Name</option>
            <option value="Email">Email</option>
          </select>

          {/* ➕ Add */}
          <button
            onClick={() => {
              setEditingUser(null);
              setShowModal(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 w-full sm:w-auto"
          >
            + Add User
          </button>
        </div>
      </div>

      {/* 📋 User Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <UserTable
          users={filteredUsers}
          onEdit={(u) => {
            setEditingUser({
              name: u.Name,
              email: u.Email,
              role: u.Role,
              _id: u._id,
            });
            setShowModal(true);
          }}
          onDelete={handleDelete}
        />
      </div>

      {/* 🧩 Modal */}
      {showModal && (
        <UserModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          user={editingUser}
        />
      )}
    </div>
  );
}
