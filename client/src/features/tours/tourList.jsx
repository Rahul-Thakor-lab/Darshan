import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import TourCard from "./TourCard.jsx"; // This now imports your new horizontal card
import API_BASE_URL from "../../config/api.js";

export default function TourList() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const destination = queryParams.get("destination");

  useEffect(() => {
    if (!destination) {
      setLoading(false);
      setTours([]); 
      return;
    }

    const fetchTours = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/tours/find?destination=${encodeURIComponent(destination)}`);
        const data = await res.json();
        setTours(data);
      } catch (err) {
        console.error("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [destination]);

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid"></div>
        <p className="mt-4 text-xl text-gray-700 font-semibold">
          Finding tours for "{destination}"...
        </p>
      </div>
    );
  }
  
  // (Your "No Destination" and "No Tours Found" states from the previous answer
  // would go here. I'm omitting them for brevity, but they should stay.)

  // --- Main Content ---
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Tour Results for: <span className="text-blue-600">"{destination}"</span>
        </h2>

        {tours.length === 0 ? (
          // --- USER-FRIENDLY "NO DATA" MESSAGE ---
          <div className="text-center bg-white p-10 rounded-lg shadow-xl max-w-2xl mx-auto">
            <span className="text-7xl mb-4 inline-block" role="img" aria-label="Sad map">
              🗺️😥
            </span>
            <h3 className="text-3xl font-semibold text-gray-800 mt-2">
              No Adventures Found... Yet!
            </h3>
            <p className="text-gray-600 mt-3 text-lg">
              We searched far and wide, but couldn't find any tours for <strong>"{destination}"</strong>.
            </p>
            
          </div>

        ) : (
          // --- MODIFIED "ROW BY ROW" LIST ---
          // This is the key change:
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}