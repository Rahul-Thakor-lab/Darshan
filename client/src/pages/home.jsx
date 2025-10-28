import CardSlider from '../components/ui/CardSlider';
import Hero from '../components/ui/hero';
import heroImg1 from "../assets/bg1.webp";
import heroImg2 from "../assets/bg.jpeg";
import galleryImg1 from "../assets/card1.avif";
import galleryImg2 from "../assets/card2.webp";
import AdventureCategories from '../components/ui/advCategory';
import Testimonials from '../components/ui/testiMonials';


function Home() {

  return (
    <div>
      <div className="min-h-screen bg-gray-100 font-sans antialiased">
        <section className=''>
          <Hero />
        </section>

        {/* Upcoming Tours Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Upcoming Darshan</h2>
            <CardSlider />
          </div>
        </section>

        {/* Who are we? Section */}
        <section className="p-1 flex flex-wrap">
          <div className="row w-full flex">
            <div className="col1 w-[55%] flex items-center justify-center flex-col p-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-8">Who are we?</h2>
              <p className="text-gray-600 max-w-3xl mb-12 leading-relaxed">
                We are a team of passionate adventurers dedicated to providing the most thrilling and safest extreme tours around the globe. Our mission is to help you discover the world's hidden gems and push your limits, all while ensuring your comfort and safety.
              </p>
            </div>
            <div className="col2 w-[45%]">
              <div className="p-1 image-gallery flex flex-wrap items-center justify-center gap-4">
                <img src={heroImg1} alt="Extreme Tours" className="w-[300px] h-[300px]" />
                <img src={heroImg2} alt="Extreme Tours" className="w-[300px] h-[300px]" />
                <img src={galleryImg1} alt="Extreme Tours" className="w-[300px] h-[300px]" />
                <img src={galleryImg2} alt="Extreme Tours" className="w-[300px] h-[300px]" />
              </div>
            </div>
          </div>
        </section>


        {/* Adventure Categories Section */}
        <section className="p-1">
          <AdventureCategories />
        </section>
        <section className="p-1">
          <Testimonials />
        </section>
        {/* Footer */}

      </div>
    </div>
  );
};

export default Home;