import { useState } from "react";

export default function LoginPopup({ isOpen, onClose, setUser }) {
  const [step, setStep] = useState("email"); // email | otp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // Send OTP API
  const sendOtp = async () => {
    try {
      const res = await fetch("http://localhost:8000/email/send-otp", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        alert("OTP sent to your email!");
        setStep("otp");
      } else {
        alert("Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    }
  };

  // Handle OTP Verification
  const handleOtpSubmit = async () => {
    if (!otp.trim()) return;

    try {
      const res = await fetch("http://localhost:8000/email/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert(`✅ Success\nEmail: ${email}`);
        const userData=data.user;
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(userData);
        resetForm();
      } else {
        alert(`❌ ${data.message || "Invalid OTP"}`);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error. Please try again.");
    }

  };

  // Reset state
  const resetForm = () => {
    setStep("email");
    setEmail("");
    setOtp("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark background */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* Popup */}
      <div className="relative bg-white rounded-2xl shadow-lg w-96 p-6 z-10">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {step === "email" && "Login with Email"}
          {step === "otp" && "Enter OTP"}
        </h2>

        {/* Step 1: Enter Email */}
        {step === "email" && (
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendOtp}
              className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Get OTP
            </button>
          </div>
        )}

        {/* Step 2: OTP Input */}
        {step === "otp" && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleOtpSubmit}
              className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* Close button */}
        <button
          onClick={resetForm}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
