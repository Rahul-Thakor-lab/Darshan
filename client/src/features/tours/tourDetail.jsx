import { useLocation } from "react-router-dom";
import BookingForm from "../../components/ui/BookingForm";
import { useState } from "react";

function tourDetail() {
    const { state } = useLocation();
    const tour = state?.tour;
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prev) =>
            prev === tour.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? tour.images.length - 1 : prev - 1
        );
    };
    return (
        <>
            <div className=" flex items-center">
                <div className="relative p-3 w-[50%] h-[30rem] overflow-hidden rounded-3xl">
                    <img
                        src={tour.images[currentIndex]}
                        alt=""
                        className="w-full h-full object-cover rounded-3xl transition-all duration-700"
                    />

                    {/* Prev Button */}
                    <button
                        onClick={prevImage}
                        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black"
                    >
                        ‹
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={nextImage}
                        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black"
                    >
                        ›
                    </button>
                </div>

                <div className="p-3 flex flex-col gap-5 w-[50%]  h-[30rem]">
                    <h1 className="text-2xl font-bold">{tour.name}</h1>
                    <p className="mr-1">Duration: {tour.duration}</p>
                    <p className="mr-1">Start From:{tour.startLocation}</p>
                    <p className="mr-1">Include: {tour.includes[0]}, {tour.includes[1]}, {tour.includes[2]}</p>
                    <p className="mr-1">Exclude: {tour.excludes}</p>
                    <p className="mr-1">Hotels: {tour.hotels[0]}, {tour.hotels[1]}</p>
                    <h1 className="text-2xl font-semibold">${tour.pricePerPerson}(PerPerson)</h1>
                    <p>Reiving</p>
                    {/* <button className="bg-black text-white py-2 px-4 rounded-lg mt-2">Book Now</button> */}
                </div>
            </div>

            <div className="md:col-span-3 space-y-5 m-2">
                <BookingForm tour={tour} />
            </div>
            


        </>
    );
}

export default tourDetail;