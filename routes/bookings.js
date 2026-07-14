const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware.js");
const bookingController = require("../controllers/bookings.js");

// Create a booking
router.post("/", isLoggedIn, wrapAsync(bookingController.createBooking));

// Show Confirmation Page
router.get("/:id/confirmation", isLoggedIn, wrapAsync(bookingController.getBookingConfirmation));

// Cancel a Booking (Soft Delete)
router.patch("/:id/cancel", isLoggedIn, wrapAsync(bookingController.cancelBooking));

module.exports = router;
