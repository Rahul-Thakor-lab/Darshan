import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../pages/Layout";

export default function BookingForm() {
    const { state } = useLocation();
    const { user } = useContext(UserContext);
    const tour = state?.tour;

    const [guests, setGuests] = useState(1);
    const [hotel, setHotel] = useState("Budget");
    const [departureCity, setDepartureCity] = useState("");
    const [travelMode, setTravelMode] = useState("");
    const [startDate, setStartDate] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");
    const [Name, setName] = useState("");

    const [travelAddons, setTravelAddons] = useState([]);
    const [addonCost, setAddonCost] = useState(0);

    const [isOpenOrderSummary, setIsOpenOrderSummary] = useState(false);
    const [osum, setOsum] = useState({});

    // Fetch TravelAddOns from backend
    useEffect(() => {
        fetch("http://localhost:8000/tours/travel-addons")
            .then((res) => res.json())
            .then((data) => setTravelAddons(data))
            .catch((err) => console.error(err));
    }, []);

    // Update addon cost when city or mode changes
    useEffect(() => {
        const selectedAddon = travelAddons.find(
            (a) => a.city === departureCity && a.mode === travelMode
        );
        setAddonCost(selectedAddon ? selectedAddon.cost : 0);
    }, [departureCity, travelMode, travelAddons]);

    // Calculate order summary
    const calculateOrder = () => {
        const perPerson = tour.pricePerPerson;
        const taxRate = 0.1; // 10%
        const discountRate = 0.05; // 5%
        const subtotal = perPerson * guests + addonCost;
        const tax = subtotal * taxRate;
        const discount = subtotal * discountRate;
        const total = subtotal + tax - discount;

        setOsum({
            PerPerson: perPerson,
            Guests: guests,
            AddonCost: addonCost,
            Subtotal: subtotal,
            Tax: tax,
            Discount: discount,
            Total: total,
        });

        setIsOpenOrderSummary(true);
    };

    const handleBooking = async () => {
        const bookingData = {
            tourId: tour._id,
            travelerName: Name,
            email: user.email,
            phone: "9876543210",
            numberOfTravelers: guests,
            departureCity,
            travelAddOnId: travelAddons.find(a => a.city === departureCity && a.mode === travelMode)?._id,
            hotelCategory: hotel,
            startDate,
            specialRequests,
            totalAmount: osum.Total,
            status: "Confirmed"
        };
        console.log("Booking Data:", bookingData);
        try {
            const res = await fetch("http://localhost:8000/booking/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData)
            });

            const data = await res.json();
            if (data.success) {
                alert("Booking Successful!");
            } else {
                alert("Booking Failed: " + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Booking Failed: " + err.message);
        }
    };


    return (
        <div className=" mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{tour.name}</h2>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {/* Full Name */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                    <input
                        type="text"
                        placeholder="Rahul Thakor"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring"
                    />
                </div>

                {/* Start Date */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]} // only future dates allowed
                        className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring"
                    />
                </div>



                {/* Guests */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Guests</label>
                    <select
                        value={guests}
                        onChange={(e) => {setGuests(e.target.value); setIsOpenOrderSummary(false);}}
                        className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring"
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Hotel Category */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Hotel Category</label>
                    <select
                        value={hotel}
                        onChange={(e) => {setHotel(e.target.value);setIsOpenOrderSummary(false);}}
                        className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring"
                    >
                        {["Budget", "Deluxe", "Luxury"].map((h) => (
                            <option key={h} value={h}>
                                {h}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Departure City */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Departure City</label>
                    <select
                        value={departureCity}
                        onChange={(e) => {setDepartureCity(e.target.value);setIsOpenOrderSummary(false);}}
                        className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring"
                    >
                        <option value="">Select City</option>
                        {Array.from(new Set(travelAddons.map((a) => a.city))).map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Travel Mode */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Travel Mode</label>
                    <select
                        value={travelMode}
                        onChange={(e) => {setTravelMode(e.target.value);setIsOpenOrderSummary(false);}}
                        className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring"
                        disabled={!departureCity}
                    >
                        <option value="">Select Mode</option>
                        {travelAddons
                            .filter((a) => a.city === departureCity)
                            .map((a) => a.mode)
                            .filter((mode, index, self) => self.indexOf(mode) === index)
                            .map((mode) => (
                                <option key={mode} value={mode}>
                                    {mode}
                                </option>
                            ))}
                    </select>
                </div>

            </div>

            {/* Special Requests */}
            <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Special Requests (Optional)</label>
                <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Eg. vegetarian meals, etc."
                    className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring min-h-[100px]"
                />
            </div>

            {/* Calculate Button */}
            <button
                onClick={calculateOrder}
                className="w-full sm:w-auto bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 mb-4"
            >
                Calculate
            </button>

            {/* Order Summary */}
            {isOpenOrderSummary && (
                <div className="border p-4 rounded-xl bg-gray-50">
                    <h3 className="text-lg font-semibold mb-2">Order Summary</h3>

                    <div className="flex justify-between mb-1">
                        <span>Per person amount</span>
                        <span>₹{osum.PerPerson}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                        <span>{osum.Guests} × ₹{osum.PerPerson}</span>
                        <span>₹{osum.PerPerson * osum.Guests}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                        <span>{travelMode}</span>
                        <span>₹{osum.AddonCost}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                        <span>Subtotal</span>
                        <span>₹{osum.Subtotal}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                        <span>Tax (10%)</span>
                        <span>₹{osum.Tax}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                        <span>Discount (5%)</span>
                        <span>-₹{osum.Discount}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2 mt-2">
                        <span>Total Amount</span>
                        <span>₹{osum.Total}</span>
                    </div>
                    <button
                        onClick={handleBooking}
                        className="w-full sm:w-auto bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 mb-4"
                    >
                        Book
                    </button>
                </div>
            )}
        </div>
    );
}