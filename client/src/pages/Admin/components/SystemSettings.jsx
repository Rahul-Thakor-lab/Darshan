import { useState, useEffect } from "react";
import { Upload, Image, Phone, Mail, MapPin, Save } from "lucide-react";
import { useSystemSettings } from "../../../context/SystemSettingsContext";

export default function SystemSettings() {
  const { settings, setSettings } = useSystemSettings();
  const [localSettings, setLocalSettings] = useState(null);

  useEffect(() => {
    if (settings) setLocalSettings({ ...settings });
  }, [settings]);

  if (!localSettings)
    return <p className="p-6 text-center text-gray-600">Loading settings...</p>;

  // Handle image preview change
  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setLocalSettings((prev) => ({
        ...prev,
        [key]: URL.createObjectURL(file),
        [`${key}File`]: file,
      }));
    }
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["phone", "email", "address"].includes(name)) {
      setLocalSettings((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [name]: value,
        },
      }));
    } else {
      setLocalSettings((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      formData.append("phone", localSettings.contact.phone);
      formData.append("email", localSettings.contact.email);
      formData.append("address", localSettings.contact.address);

      ["logo", "hero", "about"].forEach((key) => {
        if (localSettings[`${key}File`]) {
          formData.append(key, localSettings[`${key}File`]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/settings/updateSetting`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to save settings");

      const updated = await response.json();
      setSettings(updated.data);
      alert("✅ Settings saved successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save settings.");
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        System Settings ⚙️
      </h1>

      {/* IMAGE SETTINGS */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <Image className="w-5 h-5 text-blue-500" /> Website Images
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["logo", "hero", "about"].map((key) => (
            <div
              key={key}
              className="flex flex-col items-center bg-gray-50 rounded-lg p-4 shadow-sm"
            >
              <p className="font-medium text-gray-600 mb-2 capitalize">
                {key} Image
              </p>
              <img
                src={localSettings[key]}
                alt={key}
                className="w-32 h-24 sm:w-40 sm:h-28 object-cover rounded-lg border shadow-sm"
              />
              <label className="mt-3 cursor-pointer text-sm text-blue-600 hover:underline flex items-center gap-1">
                <Upload className="w-4 h-4" /> Change
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, key)}
                  accept="image/*"
                />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT SETTINGS */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow mb-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <Phone className="w-5 h-5 text-green-500" /> Contact Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Phone */}
          <div>
            <label className="text-gray-600 font-medium flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" /> Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={localSettings.contact.phone}
              onChange={handleChange}
              className="mt-2 w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
              placeholder="Enter phone number"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-600 font-medium flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={localSettings.contact.email}
              onChange={handleChange}
              className="mt-2 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
            />
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="text-gray-600 font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" /> Address
            </label>
            <textarea
              name="address"
              value={localSettings.contact.address}
              onChange={handleChange}
              className="mt-2 w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
              rows="3"
              placeholder="Enter address"
            />
          </div>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-center sm:justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2 shadow-md transition"
        >
          <Save className="w-5 h-5" /> Save Changes
        </button>
      </div>
    </div>
  );
}
