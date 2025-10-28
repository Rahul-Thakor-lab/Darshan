import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSystemSettings } from "../../context/SystemSettingsContext";

export default function Hero() {
  const systemSettings = useSystemSettings().settings;
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (destination.trim()) {
      navigate(`/tourList?destination=${encodeURIComponent(destination)}`);
    }
  };

  return (
    <div
      className="relative w-full h-[40rem] bg-cover bg-center"
      style={{
        backgroundImage: `url(${systemSettings?.hero || "/default-logo.jpg"})`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

      <section className="relative h-screen flex items-center justify-center text-center">
        <div className="relative z-10 p-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
            DARSHAN
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md">
            with maximum safety
          </p>

          <div className="flex justify-center items-center bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="p-3 flex-grow outline-none text-gray-700"
              placeholder="Search Destination (e.g., Ayodhya)"
            />
            <button
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-r-lg transition-all"
            >
              Search
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
