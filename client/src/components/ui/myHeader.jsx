// import { Link } from "react-router-dom";
// import { useState} from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { useSystemSettings } from "../../context/SystemSettingsContext";



// function Header({ onLoginClick, user}) {
//     const [menuOpen, setMenuOpen] = useState(false);
//   const systemSettings = useSystemSettings().settings;
//     return (

//         <header className="flex items-center justify-between py-4 px-6 bg-black text-white relative">
            
//             {/* Logo */}
//             <Link to="/">

//                 <img
//                     src={systemSettings?.logo || "/default-logo.jpg"}
//                     alt="logo"
//                     className="h-10 w-auto cursor-pointer"
//                 />
//             </Link>

//             {/* Desktop Menu */}
//             <nav className="hidden md:flex">
//                 <ul className="flex gap-6 items-center">
//                     <li>
//                         <Link
//                             to="/"
//                             className="font-montserrat font-medium text-lg hover:text-[rgba(179,217,241,1)] transition-all duration-300"
//                         >
//                             Home
//                         </Link>
//                     </li>
//                     <li>
//                         <Link
//                             to="/about-us"
//                             className="font-montserrat font-medium text-lg hover:text-[rgba(179,217,241,1)] transition-all duration-300"
//                         >
//                             About
//                         </Link>
//                     </li>
//                     <li>
//                         <Link
//                             to="/service"
//                             className="font-montserrat font-medium text-lg hover:text-[rgba(179,217,241,1)] transition-all duration-300"
//                         >
//                             Service
//                         </Link>
//                     </li>
//                     <li>
//                         <Link
//                             to="/contact"
//                             className="font-montserrat font-medium text-lg hover:text-[rgba(179,217,241,1)] transition-all duration-300"
//                         >
//                             Contact
//                         </Link>
//                     </li>
//                     <li>
//                         {user ? (
//                             <Link
//                                 to={user.Role=='1'?'/Profile':'/AdminProfile'}
//                                 className="font-medium text-base px-4 py-2 border rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-300"
//                             >
//                                 Profile
//                             </Link>
//                         ) : (
//                             <button
//                                 onClick={onLoginClick}
//                                 className="font-medium text-base px-4 py-2 border rounded-lg bg-orange-400 hover:bg-orange-500 transition-all duration-300"
//                             >
//                                 Login/Register
//                             </button>
//                         )}
//                     </li>
//                 </ul>
//             </nav>

//             {/* Mobile Menu Toggle */}
//             <button
//                 className="md:hidden text-white"
//                 onClick={() => setMenuOpen(!menuOpen)}
//             >
//                 {menuOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
//             </button>

//             {/* Mobile Menu */}
//             {menuOpen && (
//                 <nav className="absolute top-full left-0 w-full bg-black md:hidden z-50">
//                     <ul className="flex flex-col gap-4 p-6">
//                         <li>
//                             <Link
//                                 to="/"
//                                 className="block font-medium text-lg hover:text-[rgba(179,217,241,1)]"
//                                 onClick={() => setMenuOpen(false)}
//                             >
//                                 Home
//                             </Link>
//                         </li>
//                         <li>
//                             <Link
//                                 to="/about-us"
//                                 className="block font-medium text-lg hover:text-[rgba(179,217,241,1)]"
//                                 onClick={() => setMenuOpen(false)}
//                             >
//                                 About
//                             </Link>
//                         </li>
//                         <li>
//                             <Link
//                                 to="/service"
//                                 className="block font-medium text-lg hover:text-[rgba(179,217,241,1)]"
//                                 onClick={() => setMenuOpen(false)}
//                             >
//                                 Service
//                             </Link>
//                         </li>
//                         <li>
//                             <Link
//                                 to="/contact"
//                                 className="block font-medium text-lg hover:text-[rgba(179,217,241,1)]"
//                                 onClick={() => setMenuOpen(false)}
//                             >
//                                 Contact
//                             </Link>
//                         </li>
//                         <li>
//                            {user ? (
//                             <Link
//                                 to={user.Role=='1'?'/Profile':'/AdminProfile'}
//                                 className="font-medium text-base px-4 py-2 border rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-300"
//                             >
//                                 Profile
//                             </Link>
//                         ) : (
//                             <button
//                                 onClick={onLoginClick}
//                                 className="font-medium text-base px-4 py-2 border rounded-lg bg-orange-400 hover:bg-orange-500 transition-all duration-300"
//                             >
//                                 Login/Register
//                             </button>
//                         )}
//                         </li>
//                     </ul>
//                 </nav>
//             )}
//         </header>
//     );
// }

// export default Header;

import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSystemSettings } from "../../context/SystemSettingsContext";

function Header({ onLoginClick, user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const systemSettings = useSystemSettings().settings;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  // --- NEW Simple Dark-Theme Hover Style ---
  // Base styling for desktop nav links
  const navLinkClass =
    "font-medium text-gray-200 transition-all duration-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10";
  
  // Class for the active NavLink
  const activeLinkClass = "text-white bg-white/10";

  // Updated NavLink renderer
  const renderNavLink = (to, text) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${navLinkClass} ${isActive ? activeLinkClass : ""}`
      }
    >
      {text}
    </NavLink>
  );

  return (
    <>
      {/* --- KEY CHANGES ---
        1. bg-gray-900/80: A dark, 80% opaque background. Very close to your image.
        2. text-white: Makes all text white.
        3. backdrop-blur-lg: Blurs the hero image behind it.
        4. border-b border-white/10: A subtle white border, looks better on dark.
      */}
      <header className="sticky top-0 z-50 flex items-center justify-between py-4 px-6 md:px-10 bg-gray-900/80 text-white backdrop-blur-lg border-b border-white/10">
        
        {/* Logo */}
        <Link to="/" className="z-50">
          <img
            src={systemSettings?.logo || "/default-logo.jpg"}
            alt="logo"
            className="h-10 w-auto cursor-pointer transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex">
          <ul className="flex gap-4 items-center">
            <li>{renderNavLink("/", "Home")}</li>
            <li>{renderNavLink("/about-us", "About")}</li>
            <li>{renderNavLink("/service", "Service")}</li>
            <li>{renderNavLink("/contact", "Contact")}</li>
            <li className="ml-4">
              {user ? (
                // --- Profile Button (Simple Outline) ---
                <Link
                  to={user.Role == '1' ? '/Profile' : '/AdminProfile'}
                  className="font-medium text-base px-6 py-2 rounded-full border border-gray-300 text-gray-200 hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  Profile
                </Link>
              ) : (
                // --- Login Button (Orange Accent) ---
                <button
                  onClick={onLoginClick}
                  className="font-medium text-base px-6 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Login / Register
                </button>
              )}
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white text-xl z-50"
          onClick={() => setMenuOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </header>

      {/* --- Mobile Menu (Dark Theme) --- */}

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Menu Content (Slides in from right) */}
      <nav
        className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-white text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <ul className="flex flex-col gap-8 p-6 pt-24 items-center h-full">
          <li>
            <Link
              to="/"
              className="block font-semibold text-2xl text-gray-200 hover:text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              className="block font-semibold text-2xl text-gray-200 hover:text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/service"
              className="block font-semibold text-2xl text-gray-200 hover:text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              Service
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block font-semibold text-2xl text-gray-200 hover:text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li className="mt-8">
            {user ? (
              <Link
                to={user.Role == '1' ? '/Profile' : '/AdminProfile'}
                className="font-medium text-lg px-8 py-3 rounded-full border border-gray-300 text-gray-200 hover:bg-white/10 hover:text-white transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>            
            ) : (
              <button
                onClick={() => {
                  onLoginClick();
                  setMenuOpen(false);
                }}
                className="font-medium text-lg px-8 py-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Login / Register
              </button>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;