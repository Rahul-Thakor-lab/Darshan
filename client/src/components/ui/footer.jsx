import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
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
                  <Link to={'/'} className="font-montserrat font-medium text-xl  hover:text-[rgba(179,217,241,1)] px-5 transition-all duration-300 ease-in-out">Home</Link>
                </li>
                <li>
                  <Link to={'/about-us'} className="font-montserrat font-medium text-xl  hover:text-[rgba(179,217,241,1)] px-5 transition-all duration-300 ease-in-out">About</Link>
                </li>
                <li>
                  <Link className="font-montserrat font-medium text-xl  hover:text-[rgba(179,217,241,1)] px-5 transition-all duration-300 ease-in-out">Service</Link>
                </li>
                <li>
                  <Link to={'/contact'} className="font-montserrat font-medium text-xl  hover:text-[rgba(179,217,241,1)] px-5 transition-all duration-300 ease-in-out">Contact us</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className='mb-4'><p>&copy; 2025 Extreme Tours. All rights reserved.</p></div>

        </div>
      </footer>
    </>
  );
}
export default Footer;