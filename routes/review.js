const express = require('express');
// pass mergeParams: true
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { validateReview,isLoggedIn,isreviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// Post Review
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete Review
router.delete("/:reviewId",isLoggedIn,isreviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;
