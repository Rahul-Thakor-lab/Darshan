import { useState, useEffect } from "react";

export default function UserModal({ onClose, onSave, user }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "1",
  });

  useEffect(() => {
    if (user) setFormData(user);
    console.log(user);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">
          {user ? "Edit User" : "Add User"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
            className="w-full border rounded-md p-2 mb-3"
          />

          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="w-full border rounded-md p-2 mb-3"
          />

          <label className="block mb-2 text-sm font-medium">Role</label>
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
            className="w-full border rounded-md p-2 mb-4"
          >
            <option value="1">User</option>
            <option value="0">Admin</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
