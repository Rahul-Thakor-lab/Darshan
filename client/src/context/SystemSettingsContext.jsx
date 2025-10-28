import { createContext, useContext, useState, useEffect } from "react";

const SystemSettingsContext = createContext();

export const SystemSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  // Fetch settings from backend
  const fetchSettings = async () => {
    try {
      const response = await fetch("http://localhost:8000/settings/getSetting");
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
