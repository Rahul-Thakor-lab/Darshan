
export default function ToursTable({filteredTours,handleEdit, handleDelete, handleView }) {
    return (
        <>
            {filteredTours.length === 0 ? (
                <p className="text-center text-gray-600">No tours found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-200 bg-white rounded-xl overflow-hidden shadow-md">
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold">#</th>
                                <th className="py-3 px-4 text-left font-semibold">Tour Name</th>
                                <th className="py-3 px-4 text-left font-semibold">Location</th>
                                <th className="py-3 px-4 text-left font-semibold">Duration</th>
                                <th className="py-3 px-4 text-left font-semibold">Price (₹)</th>
                                <th className="py-3 px-4 text-center font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTours.map((t, index) => (
                                <tr
                                    key={t._id}
                                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                        } hover:bg-indigo-50 transition-colors duration-300`}
                                >
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4 font-semibold text-indigo-700">
                                        {t.name}
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">{t.startLocation}</td>
                                    <td className="py-3 px-4 text-gray-600">{t.duration}</td>
                                    <td className="py-3 px-4 text-gray-800 font-bold">
                                        ₹{t.pricePerPerson}
                                    </td>
                                    <td className="py-3 px-4 text-center space-x-2">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600"
                                            onClick={() => handleView(t)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-1.5 rounded-lg hover:bg-yellow-600"
                                            onClick={() => handleEdit(t)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-rose-500 text-white px-3 py-1.5 rounded-lg hover:bg-rose-600"
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