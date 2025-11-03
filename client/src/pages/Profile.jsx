import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Layout";
import ProfileInfo from "../components/ui/ProfileInfo";
import MyBookings from "../components/ui/MyBookings";
import LogoutTab from "../components/ui/LogoutTab";
import { FaUserCircle, FaClipboardList, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [menuOpen, setMenuOpen] = useState(false); // ✅ For mobile menu toggle

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  if (!user) return <p className="p-6">Loading profile...</p>;

  const menuItems = [
    { name: "Profile", key: "profile", icon: <FaUserCircle /> },
    { name: "My Bookings", key: "booking", icon: <FaClipboardList /> },
    { name: "Logout", key: "logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen relative">
      {/* ✅ Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-blue-700 text-white px-5 py-3 shadow-md">
        <h2 className="text-xl font-semibold">My Account</h2>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ✅ Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-30 h-full md:h-auto w-64 md:w-[260px] 
          bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col py-6 shadow-lg 
          transform transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <h2 className="text-2xl font-bold text-center mb-6 tracking-wide hidden md:block">
          My Account
        </h2>

        <nav className="flex flex-col space-y-2 px-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.key);
                setMenuOpen(false); // ✅ auto close on mobile
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium transition-all duration-200
                ${
                  activeTab === item.key
                    ? "bg-white text-blue-700 shadow-md"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto text-center text-sm text-blue-200 border-t border-blue-500 pt-4 px-4">
          © {new Date().getFullYear()} Temple Tour
        </div>
      </div>

      {/* ✅ Overlay for mobile sidebar */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-20"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* ✅ Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50 overflow-y-auto">
        {activeTab === "profile" && <ProfileInfo user={user} setUser={setUser} />}
        {activeTab === "booking" && <MyBookings user={user} />}
        {activeTab === "logout" && <LogoutTab onLogout={handleLogout} />}
      </div>
    </div>
  );
}
