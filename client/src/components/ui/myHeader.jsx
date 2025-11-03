import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSystemSettings } from "../../context/SystemSettingsContext";

const Header = ({ onLoginClick, user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { settings } = useSystemSettings();

  // ✅ Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  const renderNavLink = (to, text) => (
    <NavLink
      to={to}
      onClick={() => setMenuOpen(false)}
      className="font-medium text-gray-200 transition-all duration-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10"
    >
      {text}
    </NavLink>
  );

  return (
    <>
      {/* HEADER BAR */}
      <header className="sticky top-0 z-50 bg-gray-900/80 text-white backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center justify-between py-3 px-5 sm:px-8 md:px-12">
          {/* Logo */}
          <Link to="/" className="z-50 flex items-center gap-2">
            <img
              src={settings?.logo || "/default-logo.jpg"}
              alt="logo"
              className="h-10 sm:h-12 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex gap-4 items-center">
              <li>{renderNavLink("/", "Home")}</li>
              <li>{renderNavLink("/about-us", "About")}</li>
              <li>{renderNavLink("/service", "Services")}</li>
              <li>{renderNavLink("/contact", "Contact")}</li>
              <li className="ml-4">
                {user ? (
                  <Link
                    to={user.Role === "1" ? "/Profile" : "/AdminProfile"}
                    className="font-medium text-base px-6 py-2 rounded-full border border-gray-300 text-gray-200 hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    Profile
                  </Link>
                ) : (
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl z-[60]"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </button>
        </div>

        {/* 🔹 Dropdown Mobile Menu (slides over page, not full screen) */}
        <div
          className={`absolute left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-gray-700 shadow-lg transition-all duration-300 ease-in-out md:hidden ${
            menuOpen
              ? "max-h-[400px] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col gap-6 px-6 py-6 text-center">
            <li>{renderNavLink("/", "Home")}</li>
            <li>{renderNavLink("/about-us", "About")}</li>
            <li>{renderNavLink("/service", "Services")}</li>
            <li>{renderNavLink("/contact", "Contact")}</li>
            <li>
              {user ? (
                <Link
                  to={user.Role === "1" ? "/Profile" : "/AdminProfile"}
                  onClick={() => setMenuOpen(false)}
                  className="inline-block mt-2 px-8 py-3 rounded-full border border-gray-300 text-white hover:bg-white/10 transition-all duration-300"
                >
                  Profile
                </Link>
              ) : (
                <button
                  onClick={() => {
                    onLoginClick();
                    setMenuOpen(false);
                  }}
                  className="mt-2 px-8 py-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Login / Register
                </button>
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
