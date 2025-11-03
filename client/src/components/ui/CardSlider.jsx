import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import API_BASE_URL from '../../config/api';
import '../../styles/CardSlider.css';

const CardSlider = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/tours`)
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error("Error fetching trips:", err));
  }, []);

  const slidesToShow = Math.min(cards.length, 5);

  const settings = {
    dots: false,
    infinite: cards.length > slidesToShow,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280, // large laptop
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 1024, // tablet
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768, // small tablet
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640, // mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="card-slider-container px-4 sm:px-6 md:px-10 py-10 bg-gray-50">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
        Popular Tours
      </h2>

      <Slider {...settings}>
        {cards.map((tour) => (
          <div key={tour.id} className="p-2">
            <div
              className="bg-white rounded-2xl shadow-md hover:shadow-xl 
              transition-all duration-300 overflow-hidden flex flex-col h-[380px] w-full"
            >
              {/* Fixed-size Image */}
              <div className="h-48 w-full">
                <img
                  src={tour.images?.[0] || '/default-tour.jpg'}
                  alt={tour.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Left-Aligned Content */}
              <div className="flex flex-col justify-between flex-grow p-4 text-left">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 truncate">{tour.name}</h3>
                  <p className="text-gray-600 text-sm pb-1">{tour.duration}</p>
                  <p className="text-gray-500 text-sm pb-2">
                    Start From: {tour.startLocation}
                  </p>
                  <p className="font-bold text-lg text-orange-600 pb-2">
                    ₹{tour.pricePerPerson}
                  </p>
                </div>

                <div className="mt-auto">
                  <Link to={`/tourDetails/${tour.id}`} state={{ tour }}>
                    <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-5 rounded-full shadow-lg transform hover:scale-105 transition duration-300">
                      Book
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;
