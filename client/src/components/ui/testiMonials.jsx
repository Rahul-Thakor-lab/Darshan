import { FaStar } from "react-icons/fa";

export default function Testimonials() {
  const testimonial = {
    name: "V. Sharma",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "An amazing way to 'Discover The Culture of India.' The stories and historical details were fascinating. I learned so much more than I ever expected from an online tour!",
  };

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-10 bg-gray-50">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
        Testimonials
      </h2>

      <div
        className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-md 
                   flex flex-col sm:flex-row items-center sm:items-start gap-6 max-w-4xl mx-auto"
      >
        {/* Profile Image */}
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-md"
        />

        {/* Text Content */}
        <div className="text-center sm:text-left">
          <p className="text-gray-700 mb-4 leading-relaxed text-base sm:text-lg">
            {testimonial.text}
          </p>

          <div className="flex justify-center sm:justify-start items-center gap-2">
            <span className="font-semibold text-gray-900">{testimonial.name}</span>
            <span className="flex text-orange-500">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <FaStar key={i} className="w-4 h-4 sm:w-5 sm:h-5" />
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
