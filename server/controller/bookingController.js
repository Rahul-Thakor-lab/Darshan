const BOOKING = require("../models/bookingModel");

let addBooking = async (req, res) => {
  let booking = new BOOKING(req.body);
  try {
    await booking.save();
    res.status(201).json({
      success: true,
      message: "Booking successful",
      booking,
    });
  }
  catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

let getBooking = async (req, res) => {
  try {
    const email = req.params.email;
    const bookings = await BOOKING.find({ email });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let getAllBookings = async (req, res) => {
  try {
    const bookings = await BOOKING.find();
    res.json(bookings);

  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let Refund = async (req, res) => {
  try {
    const { id } = req.body;

    const booking = await BOOKING.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    if (booking.status !== "Cancelled") {
      return res.status(400).json({ message: "Refund can only be processed for cancelled bookings" });
    }
    
    // Update status
    booking.status = "Refunded";
    
    await booking.save();
    // Return the updated booking object
    res.json({ message: "Booking refunded successfully", booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let cancelBooking = async (req, res) => {
  try {
    const { id } = req.body;
    const booking = await BOOKING.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = "Cancelled";
    await booking.save();
    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { addBooking, getBooking, getAllBookings, Refund, cancelBooking };