export default function BookingTable({ bookings, onView, onCancel, onRefund }) {
  if (bookings.length === 0)
    return <p className="text-gray-500">No bookings found.</p>;

  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
      <table className="min-w-full text-sm text-gray-800">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Booking Id</th>
            <th className="p-3 text-left">Traveler</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Start</th>
            <th className="p-3 text-left">People</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-right">Total (₹)</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, index) => (
            <tr
              key={b._id}
              className={`${index % 2 === 0 ? "bg-indigo-50" : "bg-white"} hover:bg-indigo-100`}
            >
              <td className="p-3 border-b">{index + 1}</td>
              <td className="p-3 border-b">{b._id}</td>
              <td className="p-3 border-b">{b.travelerName}</td>
              <td className="p-3 border-b">{b.phone}</td>
              <td className="p-3 border-b">{new Date(b.startDate).toLocaleDateString("en-GB")}</td>
              <td className="p-3 border-b">{b.numberOfTravelers}</td>
              <td className="p-3 text-center border-b">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    b.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : b.status === "Cancelled"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {b.status}
                </span>
              </td>
              <td className="p-3 text-right border-b font-semibold">₹{b.totalAmount}</td>
              <td className="py-3 px-4 text-center space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600"
                  onClick={() => onView(b)}
                >
                  View
                </button>

                <button
                  disabled={b.status === "Cancelled" || b.status === "Refunded"}
                  className={`px-3 py-1.5 rounded-lg text-white ${
                    b.status === "Cancelled" || b.status === "Refunded"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-rose-500 hover:bg-rose-600"
                  }`}
                  onClick={() => onCancel(b)}
                >
                  Cancel
                </button>

                <button
                  disabled={b.status !== "Cancelled"}
                  className={`px-3 py-1.5 rounded-lg text-white ${
                    b.status === "Cancelled"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={() => onRefund(b)}
                >
                  Refund
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
