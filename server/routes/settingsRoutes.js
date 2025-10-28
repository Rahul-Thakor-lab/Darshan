// routes/settingsRoute.js
const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Settings = require("../controller/settingsController");

// File storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ensure folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Route to get settings
router.get("/getSetting", Settings.getSettings);

// ✅ Route to update settings (with image uploads)
router.put(
  "/updateSetting",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "hero", maxCount: 1 },
    { name: "about", maxCount: 1 },
  ]),
  Settings.updateSettings
);

module.exports = router;
