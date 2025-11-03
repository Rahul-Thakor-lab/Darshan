export default function ToursTable({ filteredTours, handleEdit, handleDelete, handleView }) {
  return (
    <>
      {filteredTours.length === 0 ? (
        <p className="text-center text-gray-600">No tours found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full text-sm sm:text-base text-gray-800 bg-white">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-3 px-2 sm:px-4 text-left font-semibold">#</th>
                <th className="py-3 px-2 sm:px-4 text-left font-semibold">Tour Name</th>
                <th className="py-3 px-2 sm:px-4 text-left font-semibold hidden sm:table-cell">
                  Location
                </th>
                <th className="py-3 px-2 sm:px-4 text-left font-semibold hidden sm:table-cell">
                  Duration
                </th>
                <th className="py-3 px-2 sm:px-4 text-left font-semibold">Price (₹)</th>
                <th className="py-3 px-2 sm:px-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTours.map((t, index) => (
                <tr
                  key={t._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-indigo-50 transition-colors duration-200`}
                >
                  <td className="py-3 px-2 sm:px-4 border-b">{index + 1}</td>

                  {/* Tour Name */}
                  <td className="py-3 px-2 sm:px-4 border-b font-semibold text-indigo-700">
                    {t.name}
                    <div className="sm:hidden text-gray-500 text-xs mt-1">
                      📍 {t.startLocation} • ⏱ {t.duration} days
                    </div>
                  </td>

                  {/* Location - hidden on mobile */}
                  <td className="py-3 px-2 sm:px-4 border-b text-gray-600 hidden sm:table-cell">
                    {t.startLocation}
                  </td>

                  {/* Duration - hidden on mobile */}
                  <td className="py-3 px-2 sm:px-4 border-b text-gray-600 hidden sm:table-cell">
                    {t.duration}
                  </td>

                  {/* Price */}
                  <td className="py-3 px-2 sm:px-4 border-b text-gray-800 font-bold whitespace-nowrap">
                    ₹{t.pricePerPerson}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-2 sm:px-4 border-b text-center space-y-1 sm:space-y-0 sm:space-x-2 flex sm:table-cell flex-col sm:flex-row justify-center items-center">
                    <button
                      className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 w-full sm:w-auto"
                      onClick={() => handleView(t)}
                    >
                      View
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-3 py-1.5 rounded-lg hover:bg-yellow-600 w-full sm:w-auto"
                      onClick={() => handleEdit(t)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-rose-500 text-white px-3 py-1.5 rounded-lg hover:bg-rose-600 w-full sm:w-auto"
                      onClick={() => handleDelete(t._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
