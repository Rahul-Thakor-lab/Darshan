const MONGOOSE = require("mongoose");

const userSchema = new MONGOOSE.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true , default: "User"},
  role: { type: String, default: "1" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = MONGOOSE.model("User", userSchema);