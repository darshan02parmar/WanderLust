const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");  // Import the isLoggedIn middleware
const listingsController = require("../controllers/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


// New Route
router.get("/new",isLoggedIn, listingsController.renderNewForm);

// Create a new listing
router
  .route("/")
  .get(wrapAsync(listingsController.index)) // Show all listings
  .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingsController.createListing));

// Filters and Search (placed before :id to avoid conflicts)
router.get("/filter/:category", wrapAsync(listingsController.filterByCategory));
router.get("/search", wrapAsync(listingsController.searchListings));

// Show, Update, and Delete Routes
router
  .route("/:id")
  // Show 
  .get(wrapAsync(listingsController.showListing))

  // Update
  .put(isLoggedIn, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingsController.updateListing))

  // Delete 
  .delete(isLoggedIn, isOwner, wrapAsync(listingsController.destroyListing));


// Edit Route
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingsController.renderEditForm));


module.exports = router;
