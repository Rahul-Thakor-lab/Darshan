import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSystemSettings } from "../../context/SystemSettingsContext";
import { FaSearch } from "react-icons/fa";

export default function Hero() {
  const systemSettings = useSystemSettings().settings;
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (destination.trim()) {
      navigate(`/tourList?destination=${encodeURIComponent(destination)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div
      className="relative w-full h-[28rem] sm:h-[35rem] md:h-[40rem] lg:h-[45rem] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${systemSettings?.hero || "/default-logo.jpg"})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Hero Content */}
      <section className="relative z-20 w-full px-4 sm:px-8 md:px-12 flex flex-col items-center text-center">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-3 sm:mb-4 drop-shadow-lg">
          DARSHAN
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 drop-shadow-md">
          with maximum safety
        </p>

        {/* Google-style Search Bar */}
        <div className="flex items-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-sm sm:max-w-md md:max-w-lg px-5 py-3">
          <FaSearch
            onClick={handleSearch}
            className="text-gray-500 w-5 h-5 mr-3 cursor-pointer hover:text-orange-500 transition-colors"
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow text-gray-700 text-base sm:text-lg outline-none bg-transparent"
            placeholder="Search destination..."
          />
        </div>
      </section>
    </div>
  );
}

