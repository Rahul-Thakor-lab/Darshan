export default function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
      <table className="min-w-full text-sm text-gray-800">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left cursor-pointer">Name</th>
            <th className="p-3 text-left cursor-pointer">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-center">Edit</th>
            <th className="p-3 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr
              key={u._id}
              className={`${
                index % 2 === 0 ? "bg-indigo-50" : "bg-white"
              } hover:bg-indigo-100 transition`}
            >
              <td className="p-3 border-b">{index + 1}</td>
              {/* ✅ lowercase property names */}
              <td className="p-3 border-b">{u.Name}</td>
              <td className="p-3 border-b">{u.Email}</td>
              <td className="p-3 border-b">
                {u.Role === "1" ? (
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    User
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
                    Admin
                  </span>
                )}
              </td>
              <td className="p-3 text-center border-b">
                <button
                  onClick={() => onEdit(u)}
                  className="bg-indigo-500 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-600 transition"
                >
                  Edit
                </button>
              </td>
              <td className="p-3 text-center border-b">
                <button
                  onClick={() => onDelete(u._id)}
                  className="bg-rose-500 text-white px-3 py-1.5 rounded-lg hover:bg-rose-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <p className="p-4 text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
}
