const Listing = require("./models/listing");
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const { reviewSchema } = require("./schema.js");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //redirecturl
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    }
    next();
};

module.exports.savedRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
     let { id } = req.params;
        let listing=await Listing.findById(id);
        if(!listing.owner.equals(res.locals.currentUser._id)){
            req.flash("error","You are not authorized to do that!");
            return res.redirect(`/listings/${id}`);
        }
        next();
}
   
// Middleware for validation

module.exports.validateListing=(req,res,next)=>{
    // Preprocess geometry: remove if coordinates are blank, set type if user provided coords
    if (req.body.listing && req.body.listing.geometry) {
        const coords = req.body.listing.geometry.coordinates;
        if (
            !coords ||
            coords.length !== 2 ||
            coords[0] === '' ||
            coords[1] === '' ||
            coords[0] === undefined ||
            coords[1] === undefined
        ) {
            delete req.body.listing.geometry;  // Remove empty or incomplete geometry
        } else {
            req.body.listing.geometry.type = 'Point'; // Force correct type for manual entry
        }
    }
    let {error}= listingSchema.validate(req.body);
    if(error){
        let errMsg= error.details[0].message;
        throw new ExpressError(errMsg,400);
    }else{
        next();
    }
};
    
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details[0].message;
    throw new ExpressError(errMsg, 400);
  } else {
    next();
  }
};

// module.exports.isreviewAuthor = async (req, res, next) => {
//   const { id, reviewId } = req.params;
//   const review = await Review.findById(reviewId);
//   if (!review.owner.equals(res.locals.currentUser._id)) {
//     req.flash("error", "You are not the author of this review!");
//     return res.redirect(`/listings/${id}`);
//   }
//   next();
// };

module.exports.isreviewAuthor=async(req,res,next)=>{
     let { id, reviewId } = req.params;
        let review=await Review.findById(reviewId);
        if(!review.author.equals(res.locals.currentUser._id)){
            req.flash("error","You are not the author of this review!");
            return res.redirect(`/listings/${id}`);
        }
        next();
}
