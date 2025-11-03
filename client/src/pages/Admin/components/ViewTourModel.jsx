export default function ViewTourModal({ tour, onClose }) {
  if (!tour) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-30 px-2 sm:px-4">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-3xl relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Tour Name */}
        <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4 text-center sm:text-left">
          {tour.name}
        </h2>

        {/* Basic Details */}
        <div className="space-y-2 text-gray-700 text-sm sm:text-base">
          <p>
            <strong>Location:</strong> {tour.startLocation}
          </p>
          <p>
            <strong>Duration:</strong> {tour.duration}
          </p>
          <p>
            <strong>Price per person:</strong> ₹{tour.pricePerPerson}
          </p>
        </div>

        {/* Info + Images Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {/* LEFT SIDE DETAILS */}
          <div>
            <h3 className="font-semibold text-indigo-600 mb-1">Includes:</h3>
            {tour.includes?.length ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {tour.includes.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm italic">No includes added</p>
            )}

            <h3 className="font-semibold text-indigo-600 mt-4 mb-1">Excludes:</h3>
            {tour.excludes?.length ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {tour.excludes.map((e, idx) => (
                  <li key={idx}>{e}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm italic">No excludes added</p>
            )}

            <h3 className="font-semibold text-indigo-600 mt-4 mb-1">
              Hotel Options:
            </h3>
            {tour.hotels?.length ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {tour.hotels.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm italic">No hotels listed</p>
            )}
          </div>

          {/* RIGHT SIDE IMAGES */}
          <div>
            <h3 className="font-semibold text-indigo-600 mb-2">Tour Images:</h3>
            {tour.images?.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {tour.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img instanceof File ? URL.createObjectURL(img) : img}
                    alt={`${tour.name}-${idx}`}
                    className="w-full h-24 sm:h-32 object-cover rounded-lg shadow"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">No images available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
