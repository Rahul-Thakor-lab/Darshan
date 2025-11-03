import { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import API_BASE_URL from "../../config/api";

export default function ProfileInfo({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.Name || "");

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/profile/${user.Email}`, {
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

  const handleCancel = () => {
    setNewName(user?.Name || "");
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden 
                    w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] 
                    mx-auto my-6 sm:my-10 transition-all duration-300">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 
                     p-4 sm:p-6 border-b border-gray-200 
                     text-center sm:text-left">
        My Profile
      </h1>

      {/* Profile Content */}
      <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
            Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         transition duration-200 text-gray-800 text-base sm:text-lg"
            />
          ) : (
            <p className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg 
                         text-base sm:text-lg break-words">
              {user.Name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
            Email
          </label>
          <p className="w-full px-4 py-2 bg-gray-200 text-gray-600 rounded-lg 
                       text-base sm:text-lg break-words cursor-not-allowed">
            {user.Email}
          </p>
        </div>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 pt-4 border-t border-gray-200"
        >
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex justify-center items-center gap-2 px-5 py-2.5 
                           bg-green-600 text-white font-semibold rounded-lg shadow-md
                           hover:bg-green-700 transition duration-200 w-full sm:w-auto"
              >
                <FaSave />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex justify-center items-center gap-2 px-5 py-2.5 
                           bg-gray-500 text-white font-semibold rounded-lg shadow-md
                           hover:bg-gray-600 transition duration-200 w-full sm:w-auto"
              >
                <FaTimes />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex justify-center items-center gap-2 px-5 py-2.5 
                         bg-blue-600 text-white font-semibold rounded-lg shadow-md
                         hover:bg-blue-700 transition duration-200 w-full sm:w-auto"
            >
              <FaEdit />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
