import { useContext, useState } from "react";
import { UserContext } from "../Layout";
import { useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LogoutTab from "./components/LogoutTab";
import ManageUsers from "./components/manageUsers";
import ManageBookings from "./components/manageBookings";
import ManageTours from "./components/manageTours";
import SystemSettings from "./components/SystemSettings";

// FontAwesome icons
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaPlaneDeparture,
  FaSignOutAlt,
  FaCogs,
} from "react-icons/fa";

export default function AdminProfile() {
  const { user, setUser } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const navigate = useNavigate();

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
    <div className="flex shadow-lg overflow-hidden bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-[260px] bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col py-6 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 tracking-wide">
          Admin Panel
        </h2>
        <nav className="flex flex-col space-y-2 px-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() =>
                setActiveTab(item.key)
              }
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium transition-all duration-200 ${
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

        <div className="mt-auto text-center text-sm text-blue-200 border-t border-blue-500 pt-4">
          © {new Date().getFullYear()} Admin Dashboard
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        {activeTab === "Dashboard" && <Dashboard user={user} setUser={setUser} />}
        {activeTab === "mUsers" && <ManageUsers />}
        {activeTab === "mBookings" && <ManageBookings user={user} />}
        {activeTab === "mTours" && <ManageTours user={user} />}
        {activeTab === "systemSettings" && <SystemSettings />}
        {activeTab === "logout" && <LogoutTab onLogout={handleLogout} />}
      </div>
    </div>
  );
}
