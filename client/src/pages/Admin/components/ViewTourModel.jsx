export default function ViewTourModal({ tour, onClose }) {
  if (!tour) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl w-full relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-indigo-700 mb-4">
          {tour.name}
        </h2>

        <p className="text-gray-600 mb-2">
          <strong>Location:</strong> {tour.startLocation}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Duration:</strong> {tour.duration}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Price per person:</strong> ₹{tour.pricePerPerson}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* LEFT SIDE DETAILS */}
          <div>
            <h3 className="font-semibold text-indigo-600 mb-1">Includes:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {tour.includes?.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>

            <h3 className="font-semibold text-indigo-600 mt-3 mb-1">
              Excludes:
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {tour.excludes?.map((e, idx) => (
                <li key={idx}>{e}</li>
              ))}
            </ul>

            <h3 className="font-semibold text-indigo-600 mt-3 mb-1">
              Hotel Options:
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              {tour.hotels?.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          </div>

          {/* RIGHT SIDE IMAGES */}
          <div>
            <h3 className="font-semibold text-indigo-600 mb-2">
              Tour Images:
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {tour.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={
                    img instanceof File
                      ? URL.createObjectURL(img)
                      : img
                  }
                  alt={`${tour.name}-${idx}`}
                  className="w-full h-24 object-cover rounded-lg shadow"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
