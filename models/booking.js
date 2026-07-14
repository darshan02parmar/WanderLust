const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    required: true,
    min: 1
  },
  // Price Snapshots
  pricePerNight: {
    type: Number,
    required: true
  },
  cleaningFee: {
    type: Number,
    required: true,
    default: 800
  },
  serviceFee: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  // Status
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "confirmed"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
