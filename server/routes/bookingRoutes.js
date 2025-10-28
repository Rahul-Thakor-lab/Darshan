const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');

router.get("/getAllBookings",bookingController.getAllBookings);
router.get("/:email", bookingController.getBooking);

router.post('/', bookingController.addBooking);

router.put('/refund', bookingController.Refund);
router.put('/cancel',bookingController.cancelBooking);

module.exports = router;