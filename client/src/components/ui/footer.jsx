import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 px-4">
      <div className="container mx-auto flex flex-col items-center gap-8">
        
        {/* Social Media Icons */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href="https://www.facebook.com/your-profile"
            className="text-2xl sm:text-3xl hover:text-blue-500 transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>

          <a
            href="https://www.instagram.com/your-profile"
            className="text-2xl sm:text-3xl hover:text-pink-500 transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>

          <a
            href="mailto:your-email@example.com"
            className="text-2xl sm:text-3xl hover:text-yellow-400 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>

          <a
            href="https://www.google.com/search?q=your-brand"
            className="text-2xl sm:text-3xl hover:text-red-500 transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGoogle} />
          </a>

          <a
            href="https://www.linkedin.com/search?q=your-brand"
            className="text-2xl sm:text-3xl hover:text-blue-400 transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-base sm:text-lg">
            <li>
              <Link
                to="/"
                className="hover:text-orange-400 transition-all duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="hover:text-orange-400 transition-all duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/service"
                className="hover:text-orange-400 transition-all duration-300"
              >
                Service
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-orange-400 transition-all duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Copyright */}
        <div className="text-center text-sm sm:text-base text-gray-400">
          <p>&copy; 2025 Extreme Tours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
