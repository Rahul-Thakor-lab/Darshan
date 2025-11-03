import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Layout";
import { useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LogoutTab from "./components/LogoutTab";
import ManageUsers from "./components/manageUsers";
import ManageBookings from "./components/manageBookings";
import ManageTours from "./components/manageTours";
import SystemSettings from "./components/SystemSettings";
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaPlaneDeparture,
  FaSignOutAlt,
  FaCogs,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function AdminProfile() {
  const { user, setUser } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Disable body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  if (!user) return <p className="p-6">Loading admin profile...</p>;

  const menuItems = [
    { name: "Dashboard", key: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Manage Users", key: "mUsers", icon: <FaUsers /> },
    { name: "Manage Bookings", key: "mBookings", icon: <FaClipboardList /> },
    { name: "Manage Tours", key: "mTours", icon: <FaPlaneDeparture /> },
    { name: "System Settings", key: "systemSettings", icon: <FaCogs /> },
    { name: "Logout", key: "logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 🔹 Header */}
      <header className="flex items-center justify-between bg-blue-700 text-white px-5 py-4 shadow-md sticky top-0 z-40">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-2xl focus:outline-none md:hidden"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      {/* 🔹 Mobile Dropdown Sidebar (Top to Bottom) */}
      <aside
        className={`md:hidden bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col shadow-lg absolute top-[120px] left-0 w-full overflow-hidden z-40 transition-all duration-300 ease-in-out 
          ${isSidebarOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <nav className="flex flex-col space-y-2 p-4">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                setIsSidebarOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                activeTab === item.key
                  ? "bg-white text-blue-700 shadow-md"
                  : "hover:bg-blue-500 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="text-center text-sm text-blue-200 border-t border-blue-500 pt-4 pb-3">
          © {new Date().getFullYear()} Admin Dashboard
        </div>
      </aside>

      {/* 🔹 Desktop Sidebar + Main Layout */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar for Desktop */}
        <aside className="hidden md:flex md:flex-col md:w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg">
          {/* <div className="flex items-center justify-center h-16 border-b border-blue-500">
            <h2 className="text-xl font-bold tracking-wide">Admin Panel</h2>
          </div> */}

          <nav className="flex flex-col space-y-1 p-4 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  activeTab === item.key
                    ? "bg-white text-blue-700 shadow-md"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>

          <div className="mt-auto text-center text-sm text-blue-200 border-t border-blue-500 pt-4 pb-3">
            © {new Date().getFullYear()} Admin Dashboard
          </div>
        </aside>

        {/* 🔹 Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 bg-white overflow-y-auto">
          {activeTab === "Dashboard" && (
            <Dashboard user={user} setUser={setUser} />
          )}
          {activeTab === "mUsers" && <ManageUsers />}
          {activeTab === "mBookings" && <ManageBookings user={user} />}
          {activeTab === "mTours" && <ManageTours user={user} />}
          {activeTab === "systemSettings" && <SystemSettings />}
          {activeTab === "logout" && <LogoutTab onLogout={handleLogout} />}
        </main>
      </div>
    </div>
  );
}
