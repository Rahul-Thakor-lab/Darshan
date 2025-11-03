export default function BookingTable({ bookings, onView, onCancel, onRefund }) {
  if (bookings.length === 0)
    return <p className="text-gray-500 text-center py-4">No bookings found.</p>;

  return (
    <div className="w-full overflow-x-auto rounded-xl shadow-lg border border-gray-200">
      {/* Table view for medium and larger screens */}
      <table className="hidden md:table min-w-full text-sm text-gray-800">
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
              className={`${
                index % 2 === 0 ? "bg-indigo-50" : "bg-white"
              } hover:bg-indigo-100 transition`}
            >
              <td className="p-3 border-b">{index + 1}</td>
              <td className="p-3 border-b">{b._id}</td>
              <td className="p-3 border-b">{b.travelerName}</td>
              <td className="p-3 border-b">{b.phone}</td>
              <td className="p-3 border-b">
                {new Date(b.startDate).toLocaleDateString("en-GB")}
              </td>
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
              <td className="p-3 text-right border-b font-semibold">
                ₹{b.totalAmount}
              </td>
              <td className="py-3 px-4 text-center space-x-2 border-b">
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

      {/* Card layout for small screens */}
      <div className="md:hidden flex flex-col gap-4 p-3">
        {bookings.map((b, index) => (
          <div
            key={b._id}
            className="border border-gray-200 rounded-xl shadow-sm bg-white p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-indigo-600">
                #{index + 1} – {b.travelerName}
              </h3>
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
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <strong>Booking ID:</strong> {b._id}
              </p>
              <p>
                <strong>Phone:</strong> {b.phone}
              </p>
              <p>
                <strong>Start:</strong>{" "}
                {new Date(b.startDate).toLocaleDateString("en-GB")}
              </p>
              <p>
                <strong>People:</strong> {b.numberOfTravelers}
              </p>
              <p>
                <strong>Total:</strong> ₹{b.totalAmount}
              </p>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 text-sm"
                onClick={() => onView(b)}
              >
                View
              </button>

              <button
                disabled={b.status === "Cancelled" || b.status === "Refunded"}
                className={`px-3 py-1.5 rounded-lg text-white text-sm ${
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
                className={`px-3 py-1.5 rounded-lg text-white text-sm ${
                  b.status === "Cancelled"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                onClick={() => onRefund(b)}
              >
                Refund
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
