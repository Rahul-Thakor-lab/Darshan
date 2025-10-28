// controller/settingsController.js
const mSETTING = require("../models/SettingModel");
const fs = require("fs");
const path = require("path");

const getSettings = async (req, res) => {
  try {
    const setting = await mSETTING.findOne();
    if (!setting) {
      return res.status(404).json({ message: "System settings not found" });
    }

    const imgBasePath = `${req.protocol}://${req.get("host")}/uploads/`;
    const fullSetting = {
      ...setting._doc,
      logo: `${imgBasePath}${setting.logo}`,
      hero: `${imgBasePath}${setting.hero}`,
      about: `${imgBasePath}${setting.about}`,
    };

    res.status(200).json(fullSetting);
  } catch (err) {
    console.error("❌ Error fetching settings:", err);
    res.status(500).json({ message: err.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    // 🧩 Extract fields
    const { phone, email, address } = req.body;
    const files = req.files || {};

    // Prepare update data
    const updateData = {
      contact: { phone, email, address },
    };

    // If new images are uploaded, store filenames
    ["logo", "hero", "about"].forEach((key) => {
      if (files[key] && files[key][0]) {
        updateData[key] = files[key][0].filename;
      }
    });

    // Find current settings
    let setting = await mSETTING.findOne();

    if (!setting) {
      setting = await mSETTING.create(updateData);
    } else {
      // Delete old files if replaced
      ["logo", "hero", "about"].forEach((key) => {
        if (updateData[key] && setting[key] && setting[key] !== updateData[key]) {
          const oldPath = path.join("uploads", setting[key]);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
      });

      // Update existing record
      await mSETTING.updateOne({ _id: setting._id }, updateData);
      setting = await mSETTING.findById(setting._id);
    }

    // Return updated setting
    const imgBasePath = `${req.protocol}://${req.get("host")}/uploads/`;
    const fullSetting = {
      ...setting._doc,
      logo: `${imgBasePath}${setting.logo}`,
      hero: `${imgBasePath}${setting.hero}`,
      about: `${imgBasePath}${setting.about}`,
    };

    res.json({ success: true, message: "✅ Settings updated", data: fullSetting });
  } catch (err) {
    console.error("❌ Error updating settings:", err);
    res.status(500).json({ error: "Failed to update system settings" });
  }
};

module.exports = { getSettings, updateSettings };
