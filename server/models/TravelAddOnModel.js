const MONGOOSE = require('mongoose');

const travelAddOnSchema = new MONGOOSE.Schema({
  city: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true,
    enum: ["Flight", "Train", "Bus", "Own"] // optional: restrict to common modes
  },
  cost: {
    type: Number,
    required: true
  }
}, { timestamps: true }); // automatically adds createdAt and updatedAt

module.exports = MONGOOSE.model('TravelAddOns', travelAddOnSchema,'TravelAddOns');
