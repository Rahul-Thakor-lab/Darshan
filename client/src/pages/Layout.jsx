import { Outlet } from "react-router-dom";
import LoginPopup from "../features/auth/login";
import { useState, useEffect, createContext } from "react";
import Header from "../components/ui/myHeader";
import Footer from "../components/ui/footer";
import { SystemSettingsProvider } from "../context/SystemSettingsContext";

export const UserContext = createContext();

export default function Layout() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SystemSettingsProvider>
        <div className="min-h-screen">
          <Header onLoginClick={() => setIsLoginOpen(true)} user={user} />
          <main className="flex-1 container">
            <Outlet />
          </main>
          <Footer />
          <LoginPopup
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            setUser={setUser}
          />
        </div>
      </SystemSettingsProvider>
    </UserContext.Provider>
  );
}
