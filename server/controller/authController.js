const nodemailer = require("nodemailer");
require("dotenv").config();
const User = require("../models/User");

let otpStore = {}; // { email: otp }


const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.MY_EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    });

    res.status(200).json({ success: true, otp }); // send otp back for testing
    otpStore[email] = { code: otp, expires: Date.now() + 5 * 60 * 1000 };

  } catch (error) {
    res.status(500).json({ success: false, error: "Email failed to send" });
  }
};


const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (record && record.code == otp && Date.now() < record.expires) {
    try {
      // Save email to DB if OTP is correct
      const user = await User.findOneAndUpdate(
        { email },                // find by email
        { $setOnInsert: { email } }, // only set email if inserting
        { upsert: true, new: true }
      );


      delete otpStore[email]; // clear used OTP
      res.json({ success: true, message: "OTP verified",   user: { Name: user.name, Email: user.email,Role: user.role } 
 });
    } catch (err) {
      res.status(500).json({ success: false, error: "DB save failed" });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }

}


module.exports = { sendOtp, verifyOtp };