const Booking = require("../models/booking");
const Listing = require("../models/listing");

// Create a new booking
module.exports.createBooking = async (req, res) => {
  try {
    const { listingId, checkIn, checkOut, guests } = req.body.booking;

    const parsedCheckIn = new Date(checkIn);
    const parsedCheckOut = new Date(checkOut);

    if (!checkIn || !checkOut || isNaN(parsedCheckIn.valueOf()) || isNaN(parsedCheckOut.valueOf())) {
      req.flash("error", "Please select valid check-in and check-out dates.");
      return res.redirect(`/listings/${listingId}`);
    }

    // Date Validation
    if (parsedCheckOut <= parsedCheckIn) {
      req.flash("error", "Check-out date must be after check-in date.");
      return res.redirect(`/listings/${listingId}`);
    }

    const nights = Math.ceil((parsedCheckOut - parsedCheckIn) / (1000 * 60 * 60 * 24));
    if (nights < 1 || nights > 30) {
      req.flash("error", "Bookings must be between 1 and 30 nights.");
      return res.redirect(`/listings/${listingId}`);
    }

    // Overlap Logic: Ensure no existing active booking overlaps
    const overlappingBookings = await Booking.find({
      listing: listingId,
      status: { $ne: "cancelled" },
      $nor: [
        { checkOut: { $lte: parsedCheckIn } },
        { checkIn: { $gte: parsedCheckOut } }
      ]
    });

    if (overlappingBookings.length > 0) {
      req.flash("error", "These dates are already booked.");
      return res.redirect(`/listings/${listingId}`);
    }

    // Fetch listing for pricing snapshots
    const listing = await Listing.findById(listingId);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // Pricing Calculation Snapshot
    const pricePerNight = listing.price;
    const basePrice = pricePerNight * nights;
    const cleaningFee = 800; // Static for now, can be dynamic
    const serviceFee = Math.round(basePrice * 0.1); // 10% service fee
    const tax = Math.round((basePrice + cleaningFee + serviceFee) * 0.18); // 18% GST
    const totalPrice = basePrice + cleaningFee + serviceFee + tax;

    const newBooking = new Booking({
      listing: listingId,
      user: req.user._id,
      checkIn: parsedCheckIn,
      checkOut: parsedCheckOut,
      guests,
      pricePerNight,
      cleaningFee,
      serviceFee,
      tax,
      totalPrice,
      status: "confirmed"
    });

    await newBooking.save();
    
    req.flash("success", "Booking Confirmed!");
    res.redirect(`/bookings/${newBooking._id}/confirmation`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong creating your booking.");
    res.redirect(`/listings/${req.body.booking.listingId}`);
  }
};

// Show Confirmation Page
module.exports.getBookingConfirmation = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id).populate("listing");
  
  if (!booking) {
    req.flash("error", "Booking not found.");
    return res.redirect("/");
  }
  
  // Ensure user owns this booking
  if (!booking.user.equals(req.user._id)) {
    req.flash("error", "You do not have permission to view this.");
    return res.redirect("/");
  }

  res.render("bookings/confirmation", { booking });
};

// Cancel a Booking (Soft Delete)
module.exports.cancelBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);

  if (!booking) {
    req.flash("error", "Booking not found.");
    return res.redirect("/users/trips");
  }

  if (!booking.user.equals(req.user._id)) {
    req.flash("error", "You do not have permission to cancel this booking.");
    return res.redirect("/users/trips");
  }

  booking.status = "cancelled";
  await booking.save();

  req.flash("success", "Booking has been cancelled.");
  res.redirect("/users/trips");
};
