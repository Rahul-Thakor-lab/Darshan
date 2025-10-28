const MONGOOSE = require('mongoose');

const bookingSchema = new MONGOOSE.Schema(
  {
    tourId: {
      type: MONGOOSE.Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    travelerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    numberOfTravelers: {
      type: Number,
      required: true,
      min: 1,
    },
    departureCity: {
      type: String,
      required: true,
      trim: true,
    },
    travelAddOnId: {
      type: MONGOOSE.Schema.Types.ObjectId,
      ref: "TravelAddOn",
    },
    hotelCategory: {
      type: String,
      enum: ["Budget", "Deluxe", "Luxury"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    specialRequests: {
      type: String,
      trim: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Refunded", "Confirmed", "Cancelled"],
      default: "Confirmed",
    },
  });

module.exports = MONGOOSE.model("Bookings", bookingSchema, "Bookings");