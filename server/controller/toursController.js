const TOURS = require('../models/ToursModel');
const TRAVELADDON = require('../models/TravelAddOnModel');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


// ✅ Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to store uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
 const upload = multer({ storage });


let getData = async (req, res) => {
  try {
    let tours = await TOURS.find().sort({ name: 1 });
    let imgFolderPath = `${req.protocol}://${req.get("host")}/uploads/`;
    const toursWithFullImagePath = tours.map(tour => {
      return {
        ...tour._doc,
        images:tour.images.map(img => `${imgFolderPath}${img}`)
      };
    });
    res.status(200).json(toursWithFullImagePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let getByQuery= async (req, res) => {
const { destination } = req.query;
try{
  const tours = await TOURS.find({
    name: { $regex: new RegExp(destination, "i") },
  });
  let imgFolderPath = `${req.protocol}://${req.get("host")}/uploads/`;
    const toursWithFullImagePath = tours.map(tour => {
      return {
        ...tour._doc,
        images:tour.images.map(img => `${imgFolderPath}${img}`)
      };
    });
    res.status(200).json(toursWithFullImagePath);

  res.json(tours);
}catch(err){
  res.status(500).json({ message: err.message }); 
}
};

let getAddOns = async (req, res) => {
 try {
    const addons = await TRAVELADDON.find(); // Fetch all
    res.json(addons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ Add Tour Controller
 let addData = async (req, res) => {
  try {
    const { name, startLocation, duration, pricePerPerson } = req.body;
    const includes = req.body.includes || [];
    const excludes = req.body.excludes || [];
    const hotels = req.body.hotels || [];

    // Handle images
    const images = req.files ? req.files.map(f => f.filename) : [];

    let tour = new TOURS({
      name,
      startLocation,
      duration,
      pricePerPerson,
      includes: Array.isArray(includes) ? includes : [includes],
      excludes: Array.isArray(excludes) ? excludes : [excludes],
      hotels: Array.isArray(hotels) ? hotels : [hotels],
      images,
    });

    await tour.save();
    res.status(201).json(tour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


let updateData = async (req, res) => {
  try {
    const { name, startLocation, duration, pricePerPerson, includes, excludes, hotels, existingImages } = req.body;

    // Ensure existingImages is always an array
    const existingImgs = Array.isArray(existingImages)
      ? existingImages
      : existingImages
      ? [existingImages]
      : [];

    // Get filenames from new uploads
    const newImages = req.files.map((f) => f.filename);

    // 1️⃣ Get old tour data from DB
    const oldTour = await TOURS.findById(req.params.id);
    if (!oldTour) return res.status(404).json({ message: "Tour not found" });

    // 2️⃣ Find which images were removed
    const removedImages = oldTour.images.filter((img) => !existingImgs.includes(img));

    // 3️⃣ Delete removed images from uploads folder
    removedImages.forEach((img) => {
      const filePath = path.join("uploads", img);
      fs.unlink(filePath, (err) => {
        if (err) console.error(`❌ Failed to delete ${img}:`, err.message);
        else console.log(`🗑️ Deleted unused image: ${img}`);
      });
    });

    // 4️⃣ Update DB
    const updatedTour = await TOURS.findByIdAndUpdate(
      req.params.id,
      {
        name,
        startLocation,
        duration,
        pricePerPerson,
        includes: Array.isArray(includes) ? includes : [includes],
        excludes: Array.isArray(excludes) ? excludes : [excludes],
        hotels: Array.isArray(hotels) ? hotels : [hotels],
        images: [...existingImgs, ...newImages],
      },
      { new: true }
    );

    res.json(updatedTour);
  } catch (err) {
    console.error("Update error:", err);
    res.status(400).json({ message: err.message });
  }
};

let deleteData= async (req, res) => {
 try {
    const deletedTour = await TOURS.findByIdAndDelete(req.params.id);
    if (!deletedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.json({ message: "Tour deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getData,getByQuery,getAddOns, addData,updateData,deleteData,upload};