import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Layout";
import ProfileInfo from "../components/ui/ProfileInfo";
import MyBookings from "../components/ui/MyBookings";
import LogoutTab from "../components/ui/LogoutTab";


export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="flex rounded-2xl shadow-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-[25%] p-6 flex flex-col bg-gray-100 gap-4 h-screen">
        <button className="text-left px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white" onClick={() => setActiveTab("profile")}>Profile</button>
        <button className="text-left px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white" onClick={() => setActiveTab("booking")}>My Booking</button>
        <button className="text-left px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white" onClick={() => setActiveTab("logout")}>Logout</button>
      </div>

      {/* Content */}
      <div className="w-[100%] p-6 h-screen overflow-y-auto">
        {activeTab === "profile" && <ProfileInfo user={user} setUser={setUser} />}
        {activeTab === "booking" && <MyBookings user={user} />}
        {activeTab === "logout" && <LogoutTab onLogout={handleLogout} />}
      </div>
    </div>
  );
}
