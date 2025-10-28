const express = require('express');
const router = express.Router();
const controller = require('../controller/toursController');


// GET all trips
router.get('/', controller.getData);
router.get('/travel-addons', controller.getAddOns);
router.get('/find', controller.getByQuery);
// Add a new trip
router.post('/', controller.upload.array("images"), controller.addData);
//Update a trip
router.put("/:id", controller.upload.array("images"), controller.updateData);
// Delete a trip
router.delete("/:id", controller.deleteData);

module.exports = router;