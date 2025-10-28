import { useEffect, useState } from "react";
import Maintenance from "./Maintenance";

export default function MyBookings({ user }) {
  const [bookings, setBookings] = useState([]);
const [isBackendOnline, setIsBackendOnline] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch(`http://localhost:8000/booking/${user.Email}`);
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
        if (err instanceof TypeError) {
          setIsBackendOnline(false);
        }
      }
    }
    fetchBookings();
  }, [user]);

  if (!isBackendOnline) return <Maintenance />;
  if (bookings.length === 0) return <p>You have no bookings yet.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <div className="flex flex-col gap-6">
        {bookings.map((booking) => (
          <div key={booking._id} className="border rounded-xl p-4 shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-2">{booking.tourId}</h2>
            <p><strong>Traveler:</strong> {booking.travelerName}</p>
            <p><strong>Departure City:</strong> {booking.departureCity}</p>
            <p><strong>Hotel:</strong> {booking.hotelCategory}</p>
            <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
            <p><strong>Total:</strong> ₹{booking.totalAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
