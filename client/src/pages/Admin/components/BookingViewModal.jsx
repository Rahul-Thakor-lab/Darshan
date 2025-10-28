export default function BookingViewModal({ booking, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg relative">
        <h2 className="text-xl font-bold mb-4 text-indigo-600">Booking Details</h2>
        <div className="space-y-2">
          <p><strong>Booking ID:</strong> {booking._id}</p>
          <p><strong>Traveler:</strong> {booking.travelerName}</p>
          <p><strong>Email:</strong> {booking.email}</p>
          <p><strong>Phone:</strong> {booking.phone}</p>
          <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString("en-GB")}</p>
          <p><strong>Status:</strong> {booking.status}</p>
          <p><strong>Total:</strong> ₹{booking.totalAmount}</p>
        </div>

        <button
          className="mt-5 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
