import { useState } from "react";

export default function ProfileInfo({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:8000/user/profile/${user.Email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      const data = await res.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-gray-600 text-sm mb-1">Name</label>
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          ) : (
            <p className="p-2 bg-gray-100 rounded-lg">{user.Name}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-600 text-sm mb-1">Email</label>
          <p className="p-2 bg-gray-200 rounded-lg text-gray-600">{user.Email}</p>
        </div>

        {isEditing ? (
          <div className="flex gap-3">
            <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-lg">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-400 text-white rounded-lg">
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Edit
          </button>
        )}
      </div>
    </div>
  );
}