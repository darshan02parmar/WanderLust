const User = require("../models/user");
const { userSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");

module.exports.renderSignupForm=(req, res) => {
  res.render("users/signup");
};

module.exports.signup=(async(req,res,next)=>{
    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }   
    try{
        const {username,email,password}=req.body;
        const user=new User({username,email});
        const registeredUser=await User.register(user,password);
        console.log(registeredUser);
        req.login(registeredUser,err=>{
            if(err) return next(err);
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
});

module.exports.renderLoginForm= (req, res) => {
  res.render("users/login");
}

module.exports.login=(req, res) => {
  req.flash("success", "Welcome back!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  delete req.session.redirectUrl;
  res.redirect(redirectUrl);
};

module.exports.logout=(req, res, next) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out!");
    res.redirect("/listings");
  });
};

// User Dashboard (Trips)
module.exports.getUserTrips = async (req, res) => {
  const Booking = require("../models/booking");
  const bookings = await Booking.find({ user: req.user._id }).populate("listing").sort({ checkIn: 1 });
  
  const now = new Date();
  
  const upcomingTrips = bookings.filter(b => b.status === "confirmed" && b.checkIn >= now);
  const pastTrips = bookings.filter(b => b.status === "completed" || (b.status === "confirmed" && b.checkOut < now));
  const cancelledTrips = bookings.filter(b => b.status === "cancelled");

  res.render("users/trips", { upcomingTrips, pastTrips, cancelledTrips });
};

// Host Dashboard (Analytics)
module.exports.getHostDashboard = async (req, res) => {
  const Listing = require("../models/listing");
  const Booking = require("../models/booking");

  const myListings = await Listing.find({ owner: req.user._id });
  const listingIds = myListings.map(l => l._id);

  const allBookings = await Booking.find({ listing: { $in: listingIds } }).populate("listing").sort({ checkIn: 1 });
  
  const now = new Date();
  
  const upcomingGuests = allBookings.filter(b => b.status === "confirmed" && b.checkIn >= now);
  const currentGuests = allBookings.filter(b => b.status === "confirmed" && b.checkIn <= now && b.checkOut >= now);
  const completedBookings = allBookings.filter(b => b.status === "completed" || (b.status === "confirmed" && b.checkOut < now));

  // Calculate Revenue (Only for completed or current, not cancelled)
  const totalRevenue = allBookings
    .filter(b => b.status !== "cancelled")
    .reduce((acc, curr) => acc + (curr.totalPrice - curr.serviceFee - curr.tax), 0); // Roughly price * nights + cleaning fee

  res.render("users/dashboard", { upcomingGuests, currentGuests, completedBookings, totalRevenue });
};