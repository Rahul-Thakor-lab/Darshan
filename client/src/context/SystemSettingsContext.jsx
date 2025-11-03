import { createContext, useContext, useState, useEffect } from "react";
import API_BASE_URL from "../config/api";

const SystemSettingsContext = createContext();

export const SystemSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  // Fetch settings from backend
  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings/getSetting`);
      const data = await response.json();
      setSettings(data);
    } catch (err) {
      console.error("Error fetching system settings:", err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SystemSettingsContext.Provider value={{ settings,setSettings,fetchSettings }}>
      {children}
    </SystemSettingsContext.Provider>
  );
};

// Custom hook
export const useSystemSettings = () => useContext(SystemSettingsContext);
