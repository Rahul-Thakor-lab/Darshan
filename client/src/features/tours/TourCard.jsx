import { Link } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react"; // Added MapPin for location

export default function TourCard({ tour }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] flex flex-col md:flex-row">
      
      {/* Image Section */}
      <div className="md:w-1/3">
        <img
          src={tour.images[0]}
          alt={tour.name}
          className="h-56 w-full object-cover md:h-full" // h-full ensures it fills the card height on desktop
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col justify-between md:w-2/3">
        {/* Top Content (Title, Details) */}
        <div>
          <h3 className="text-2xl font-bold mb-3 text-gray-800">{tour.name}</h3>
          
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" /> 
            Starts from: <span className="font-semibold ml-1">{tour.startLocation}</span>
          </div>
          
          <div className="flex items-center text-gray-600 text-sm mb-4">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" /> 
            Duration: <span className="font-semibold ml-1">{tour.duration}</span>
          </div>

          <p className="text-gray-700 mb-4 line-clamp-3">
            {tour.summary || "Join us for an unforgettable adventure. Discover the best sights and sounds..."} 
            {/* Added a fallback summary */}
          </p>
        </div>

        {/* Bottom Content (Price & Button) */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-orange-500 font-bold text-2xl">
            ₹{tour.pricePerPerson}
            <span className="text-sm font-normal text-gray-600"> / person</span>
          </span>
          <Link 
            to={`/tourDetails/${tour.id}`}
            state={{ tour }}
          >
            <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}