import CardSlider from "../components/ui/CardSlider";
import Hero from "../components/ui/hero";
import Img1 from "../assets/i1.jpg";
import Img2 from "../assets/i2.webp";
import Img3 from "../assets/i3.jpg";
import Img4 from "../assets/i4.jpg";
import Testimonials from "../components/ui/testiMonials";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased overflow-x-hidden">
      {/* Hero Section */}
      <section>
        <Hero />
      </section>

      {/* Upcoming Tours Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            Upcoming Darshan
          </h2>
          <CardSlider />
        </div>
      </section>

      {/* Who are we? Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-10 bg-white">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Text Section */}
          <div className="w-full lg:w-1/2 text-justify lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Who are we?
            </h2>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
              At <span className="font-semibold">Temple Tour</span>, our name is our promise. 
              We are your dedicated guides to <b>Discovering The Culture of India</b> through its most sacred 
              and awe-inspiring temples. We believe that every temple is a living museum—a testament 
              to millennia of faith, a masterpiece of architecture, and a treasure chest of timeless stories. 
              Our team is composed of historians, researchers, and digital artists passionate about preserving 
              and sharing this incredible heritage.
            </p>
          </div>

          {/* Right Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-wrap justify-center gap-4">
            {[Img1, Img2, Img3, Img4].map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Temple Tour"
                className="w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-10 bg-gray-50">
        <Testimonials />
      </section>
    </div>
  );
}

export default Home;
