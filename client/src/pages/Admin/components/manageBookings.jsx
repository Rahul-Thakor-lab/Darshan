import { useEffect, useState } from "react";
import BookingTable from "./BookingTable";
import BookingViewModal from "./BookingViewModal";
import API_BASE_URL from "../../../config/api";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch all bookings
  useEffect(() => {
    async function getAllBookings() {
      try {
        const res = await fetch(`${API_BASE_URL}/booking/getAllBookings`);
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
        setFiltered(data);
      } catch (err) {
        console.error(err);
      }
    }
    getAllBookings();
  }, []);

  // Search filter
  useEffect(() => {
    const f = bookings.filter((b) =>
      b._id.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(f);
  }, [search, bookings]);

  // Cancel booking
  async function handleCancel(booking) {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/booking/cancel`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: booking._id }),
      });
      if (!res.ok) throw new Error("Cancel failed");

      const updated = await res.json();
      setBookings((prev) =>
        prev.map((b) =>
          b._id === booking._id ? { ...b, status: "Cancelled" } : b
        )
      );
      alert(updated.message || "Booking cancelled successfully");
    } catch (err) {
      console.error(err);
      alert("Error cancelling booking");
    }
  }

  // Process refund
  async function handleRefund(booking) {
    if (!window.confirm("Process refund for this booking?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/booking/refund`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: booking._id }),
      });
      if (!res.ok) throw new Error("Refund failed");

      const updated = await res.json();
      setBookings((prev) =>
        prev.map((b) =>
          b._id === booking._id ? { ...b, status: "Refunded" } : b
        )
      );
      alert(updated.message || "Booking refunded successfully");
    } catch (err) {
      console.error(err);
      alert("Error processing refund");
    }
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 text-center sm:text-left">
          Manage Bookings
        </h1>

        {/* Search Input */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <input
            type="text"
            placeholder="Search by Booking ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <BookingTable
          bookings={filtered}
          onView={(b) => setSelectedBooking(b)}
          onCancel={handleCancel}
          onRefund={handleRefund}
        />
      </div>

      {/* View Modal */}
      {selectedBooking && (
        <BookingViewModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}
