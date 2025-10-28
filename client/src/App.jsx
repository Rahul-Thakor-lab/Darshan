import './App.css'
import CardSlider from './CardSlider';
import Hero from './hero';
import heroImg1 from "./assets/bg1.webp";
import heroImg2 from "./assets/bg.jpeg";
import galleryImg1 from "./assets/galery1.jpg";
import galleryImg2 from "./assets/galery2.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faInstagram,faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Contact from './pages/contact';


function App() {

  return (
    <div>
      <div className="min-h-screen bg-gray-100 font-sans antialiased">
        <Hero />

        {/* Upcoming Tours Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Upcoming Tours</h2>
            <CardSlider />
          </div>
        </section>

        {/* Who are we? Section */}
        <section
          className="bg-gray-50 flex flex-wrap"
        >
          <div className="row w-full flex">
            <div className="col1 w-[55%] flex items-center justify-center flex-col p-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-8">Who are we?</h2>
              <p className="text-gray-600 max-w-3xl mb-12 leading-relaxed">
                We are a team of passionate adventurers dedicated to providing the most thrilling and safest extreme tours around the globe. Our mission is to help you discover the world's hidden gems and push your limits, all while ensuring your comfort and safety.
              </p>
            </div>
            <div className="col2 w-[45%]">
              <div className="image-gallery flex flex-wrap items-center justify-center gap-4">
                <img src={heroImg1} alt="Extreme Tours" className="w-[300px] h-[300px]" />
                <img src={heroImg2} alt="Extreme Tours" className="w-[300px] h-[300px]" />
                <img src={galleryImg1} alt="Extreme Tours" className="w-[300px] h-[300px]" />
                <img src={galleryImg2} alt="Extreme Tours" className="w-[300px] h-[300px]" />
              </div>
            </div>
          </div>
        </section>

        {/* Our advantages Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our advantages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Advantage Card 1 */}
              <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
                <div className="text-blue-600 text-5xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1l-.75-3M3 13h18M5 17h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Experience</h3>
                <p className="text-gray-600">
                  With over a decade of experience in extreme tourism, we have perfected our tours to offer unparalleled excitement and safety.
                </p>
              </div>

              {/* Advantage Card 2 */}
              <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
                <div className="text-blue-600 text-5xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v3h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Security</h3>
                <p className="text-gray-600">
                  Your safety is our top priority. We adhere to the strictest safety protocols and use only certified equipment.
                </p>
              </div>

              {/* Advantage Card 3 */}
              <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
                <div className="text-blue-600 text-5xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Global Reach</h3>
                <p className="text-gray-600">
                  Explore breathtaking destinations across the globe with our expertly curated international tours.
                </p>
              </div>
            </div>
          </div>
        </section>
 <Contact />

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 text-center">
          <div className="container mx-auto px-4">
            <div className='flex items-center justify-center gap-4 mb-4'>
              <a href="https://www.facebook.com/your-profile" className='fa-2x' target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://www.instagram.com/your-profile" className='fa-2x' target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="mailto:your-email@example.com" className='fa-2x'>
                <FontAwesomeIcon icon={faEnvelope} />
              </a>
              <a href="https://www.google.com/search?q=your-brand" className='fa-2x' target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="https://www.linkedin.com/search?q=your-brand" className='fa-2x' target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
            <div>
              <nav className="">
                <ul className="list-none flex items-center justify-center gap-4 mb-4"> {/* list-none to remove bullets, flex for inline-block */}
                  <li>
                    <a href="#" className="font-montserrat font-medium text-base text-[#ffffff] hover:text-[rgba(179,217,241,1)] px-5 transition-all duration-300 ease-in-out">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="font-montserrat font-medium text-base text-[#ffffff] hover:text-[rgba(179,217,241,1)] px-5 transition-all duration-300 ease-in-out">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="font-montserrat font-medium text-base text-[#ffffff] hover:text-[rgba(179,217,241,1)] px-5 transition-all duration-300 ease-in-out">
                      Service
                    </a>
                  </li>

                  <li>
                    <a href="#" className="font-montserrat font-medium text-base text-[#ffffff] hover:text-[rgba(179,217,241,1)] px-5 transition-all duration-300 ease-in-out">
                      Contact us
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className='mb-4'><p>&copy; 2025 Extreme Tours. All rights reserved.</p></div>

          </div>
        </footer>
      </div>
    </div>
  );
};

export default App
