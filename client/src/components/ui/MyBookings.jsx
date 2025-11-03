import { useEffect, useState } from "react";
import Maintenance from "./Maintenance";
import { FaUser, FaCity, FaHotel, FaCalendarAlt } from "react-icons/fa";
import API_BASE_URL from "../../config/api";

export default function MyBookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const [isBackendOnline, setIsBackendOnline] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch(`${API_BASE_URL}/booking/${user.Email}`);
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
        if (err instanceof TypeError) setIsBackendOnline(false);
      }
    }
    fetchBookings();
  }, [user]);

  if (!isBackendOnline) return <Maintenance />;

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 text-center 
                      w-[90%] sm:w-[80%] md:w-[60%] mx-auto my-10 transition-all duration-300">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
          No Bookings Found
        </h2>
        <p className="text-gray-500 text-sm sm:text-base">
          It looks like you haven’t booked any tours yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[95%] sm:max-w-3xl md:max-w-5xl mx-auto 
                    px-3 sm:px-6 md:px-8 py-6 sm:py-10">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 
                     text-center sm:text-left">
        My Bookings
      </h1>

      {/* Booking Cards */}
      <div className="flex flex-col gap-6 sm:gap-8">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden 
                       transition-all duration-300 hover:shadow-xl"
          >
            {/* Header */}
            <div className="bg-gray-50 p-4 sm:p-5 border-b border-gray-200">
              <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 text-center sm:text-left break-words">
                {booking.tourId}
              </h2>
            </div>

            {/* Details Grid */}
            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-5">
              {/* Traveler */}
              <DetailItem
                icon={<FaUser className="text-blue-500 text-lg sm:text-xl" />}
                label="Traveler"
                value={booking.travelerName}
              />

              {/* Departure City */}
              <DetailItem
                icon={<FaCity className="text-blue-500 text-lg sm:text-xl" />}
                label="Departure City"
                value={booking.departureCity}
              />

              {/* Hotel */}
              <DetailItem
                icon={<FaHotel className="text-blue-500 text-lg sm:text-xl" />}
                label="Hotel"
                value={booking.hotelCategory}
              />

              {/* Start Date */}
              <DetailItem
                icon={<FaCalendarAlt className="text-blue-500 text-lg sm:text-xl" />}
                label="Start Date"
                value={new Date(booking.startDate).toLocaleDateString()}
              />
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 sm:p-5 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:justify-end sm:items-baseline 
                              gap-1 sm:gap-3 text-center sm:text-right">
                <span className="text-base sm:text-lg font-medium text-gray-600">
                  Total:
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-green-600">
                  ₹{booking.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🔹 Reusable Responsive DetailItem Component */
function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div className="min-w-0">
        <span className="text-xs sm:text-sm font-medium text-gray-500 block">
          {label}
        </span>
        <span className="text-base sm:text-lg font-semibold text-gray-800 break-words">
          {value}
        </span>
      </div>
    </div>
  );
}
