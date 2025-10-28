import { useEffect, useState } from "react";
import BookingTable from "./BookingTable";
import BookingViewModal from "./BookingViewModal";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch all bookings
  useEffect(() => {
    async function getAllBookings() {
      try {
        const res = await fetch("http://localhost:8000/booking/getAllBookings");
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

  // Search by Booking ID
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
      const res = await fetch(`http://localhost:8000/booking/cancel`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: booking._id }),
      });
      if (!res.ok) throw new Error("Cancel failed");
      setBookings((prev) =>
        prev.map((b) => (b._id === booking._id ? { ...b, status: "Cancelled" } : b))
      );

      const updated = await res.json();

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
      const res = await fetch(`http://localhost:8000/booking/refund`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: booking._id }),
      });
      if (!res.ok) throw new Error("Refund failed");
      setBookings((prev) =>
        prev.map((b) => (b._id === booking._id ? { ...b, status: "Refunded" } : b))
      );
      const updated = await res.json();

      alert(updated.message || "Booking Refund successfully");
    } catch (err) {
      console.error(err);
      alert("Error processing refund");
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold mb-6 text-indigo-700">Manage Bookings</h1>

        {/* Search */}
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Search by Booking ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>
      {/* Table */}
      <BookingTable
        bookings={filtered}
        onView={(b) => setSelectedBooking(b)}
        onCancel={handleCancel}
        onRefund={handleRefund}
      />

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
