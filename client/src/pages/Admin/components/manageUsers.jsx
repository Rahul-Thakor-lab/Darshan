import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import UserModal from "./UserModal";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // For search/sort display
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch users from backend
  const getAllUsers = async () => {
    try {
      const res = await fetch("http://localhost:8000/user/getAllusers");
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
        ? `http://localhost:8000/user/update/${editingUser._id}`
        : `http://localhost:8000/user/addUser`;
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
      const res = await fetch(`http://localhost:8000/user/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      await getAllUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Search users
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = users.filter(
      (u) =>
        u.Name?.toLowerCase().includes(term.toLowerCase()) ||
        u.Email?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Sorting users
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">All Users</h1>

        <div className="flex gap-2">
          {/* 🔍 Search */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* ↕️ Sorting */}
          <select
            value={sortField}
            onChange={(e) => handleSort(e.target.value)}
            className="border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
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
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            + Add User
          </button>
        </div>
      </div>

      {/* 📋 User Table */}
      <UserTable
        users={filteredUsers}
        onEdit={(u) => {
          setEditingUser({name:u.Name,email:u.Email,role:u.Role,_id:u._id});
          setShowModal(true);
        }}
        onDelete={handleDelete}
      />

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
