export default function BookingViewModal({ booking, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-3 sm:px-0">
      <div className="bg-white rounded-xl p-5 sm:p-6 w-full max-w-sm sm:max-w-md shadow-lg relative overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-indigo-600 text-center sm:text-left">
          Booking Details
        </h2>

        <div className="space-y-2 text-gray-800 text-sm sm:text-base">
          <p>
            <strong>Booking ID:</strong> {booking._id}
          </p>
          <p>
            <strong>Traveler:</strong> {booking.travelerName}
          </p>
          <p>
            <strong>Email:</strong> {booking.email}
          </p>
          <p>
            <strong>Phone:</strong> {booking.phone}
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(booking.startDate).toLocaleDateString("en-GB")}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                booking.status === "Confirmed"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "Cancelled"
                  ? "bg-rose-100 text-rose-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {booking.status}
            </span>
          </p>
          <p>
            <strong>Total:</strong> ₹{booking.totalAmount}
          </p>
        </div>

        <div className="flex justify-center sm:justify-end mt-6">
          <button
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition text-sm sm:text-base"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
