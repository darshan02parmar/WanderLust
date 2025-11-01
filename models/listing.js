const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true, // Corrected from 'require'
  },
  description: {
    type: String,
    required: true, // Corrected from 'require'
  },
  image: {
    // filename: {
    //   type: String,
    //   default: "listingimage"
    // },
    // url: {
    //   type: String,
    //   default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3"
    // }
    url:String,
    filename:String,
  },
  price: {
    type: Number,
    required: true, // Corrected from 'require'
  },
  location: {
    type: String,
    required: true, // Corrected from 'require'
  },
  country: {
    type: String,
    required: true, // Corrected from 'require'
  },
  category: {
    type: String,
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      default: [73.1812, 22.3072] // [lng, lat] for Vadodara as fallback
    }
  },
  reviews: [
  {
    type: Schema.Types.ObjectId,
    ref: "Review"
  }
],
owner:{
  type:Schema.Types.ObjectId,
  ref:"User",
}

});

listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
    await review.deleteMany({_id:{$in:listing.reviews}});
  }
});
  

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;