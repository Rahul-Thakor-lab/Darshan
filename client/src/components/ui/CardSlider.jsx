import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

import '../../styles/CardSlider.css';


const CardSlider = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/tours")
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
    responsive: [
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="card-slider-container">
      <Slider {...settings}>
        {cards.map((tour) => (
          <div key={tour.id} className="card">
            <div className="card-image h-48">
              <img src={tour.images[0]} className="w-full h-full object-cover" alt="image not found" />
            </div>
            <div className="card-content align-left">
              <div className='text-left font-bold text-lg'>{tour.name}</div>
              <div className='text-left pb-2'>{tour.duration}</div>
              <div className='text-left pb-2'>Start From: {tour.startLocation}</div>
              <div className='text-left font-bold'>₹{tour.pricePerPerson}</div>
              <div className='flex justify-between items-center'>
                <span>
                  <Link to={`/tourDetails/${tour.id}`}
                  state={{ tour }}
                  >
                    <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold mx-2 py-2 px-5 rounded-full shadow-lg transform hover:scale-105 transition duration-300">
                      Book
                    </button>
                  </Link>    
                  </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CardSlider;
