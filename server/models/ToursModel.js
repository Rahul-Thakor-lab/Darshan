const MONGOOSE = require('mongoose');

const tourSchema = new MONGOOSE.Schema({
  name: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  startLocation: {
    type: String,
    required: true
  },
  pricePerPerson: {
    type: Number,
    required: true
  },
  includes: {
    type: [String], // Array of strings
    default: []
  },
  excludes: {
    type: [String],
    default: []
  },
  hotels: {
    type: [String], // e.g., Budget, Deluxe, Luxury
    default: []
  },
  images: { type: Array } ,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the model
module.exports = MONGOOSE.model('Tours', tourSchema,'Tours');