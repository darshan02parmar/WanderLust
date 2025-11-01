const Listing = require("../models/listing");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError.js");

module.exports.createReview = (async (req, res) => {
  
  const { id } = req.params;   // now works
  let listing = await Listing.findById(id);
  if (!listing) {
    console.log("Listing not found for ID:", id);
    throw new ExpressError("Listing not found", 404);
  }
  let newReview = new Review(req.body.review);
  newReview.author = res.locals.currentUser._id;
  console.log("Created new review:", newReview);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  console.log("Review saved and linked to listing:", listing._id);
  req.flash("success","New Review Created");
  res.redirect(`/listings/${listing._id}`);
});

module.exports.destroyReview = (async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success","Review Deleted");
  res.redirect(`/listings/${id}`);
});