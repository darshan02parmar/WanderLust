const Listing = require("../models/listing");
const axios = require('axios');

module.exports.index=async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
}

module.exports.renderNewForm=(req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing=(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        }
    })
    .populate("owner");
    if (!listing) {
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
});


module.exports.createListing = async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    // Coordinates handling
    let coordsProvided = req.body.listing.geometry && req.body.listing.geometry.coordinates && req.body.listing.geometry.coordinates[0] && req.body.listing.geometry.coordinates[1];
    if (coordsProvided) {
      newListing.geometry = {
        type: 'Point',
        coordinates: [
          parseFloat(req.body.listing.geometry.coordinates[0]),
          parseFloat(req.body.listing.geometry.coordinates[1])
        ]
      };
    } else if (req.body.listing.location) {
      const location = req.body.listing.location;
      // Use Nominatim for geocoding
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: location,
          format: 'json',
          limit: 1
        }
      });
      if (response.data.length > 0) {
        newListing.geometry = {
          type: 'Point',
          coordinates: [
            parseFloat(response.data[0].lon),
            parseFloat(response.data[0].lat)
          ]
        };
      }
    }
    if (req.file) {
      newListing.image = {
        filename: req.file.filename,
        url: req.file.path
      };
    }
    await newListing.save();
    req.flash("success", "Successfully made a new listing!");
    res.redirect(`/listings/${newListing._id}`);
  } catch (e) {
    console.error('Error creating listing:', e);
    req.flash('error', 'Something went wrong while creating the listing!');
    res.redirect('/listings/new');
  }
};


module.exports.renderEditForm=(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error","Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
});

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  if (!req.body.listing) throw new ExpressError("Invalid Listing Data", 400);
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  // Coordinates handling
  let coordsProvided = req.body.listing.geometry && req.body.listing.geometry.coordinates && req.body.listing.geometry.coordinates[0] && req.body.listing.geometry.coordinates[1];
  if (coordsProvided) {
    listing.geometry = {
      type: 'Point',
      coordinates: [
        parseFloat(req.body.listing.geometry.coordinates[0]),
        parseFloat(req.body.listing.geometry.coordinates[1])
      ]
    };
  } else if (req.body.listing.location) {
    const location = req.body.listing.location;
    // Use Nominatim for geocoding if not provided
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: location,
        format: 'json',
        limit: 1
      },
      headers: {
          'User-Agent': 'WanderlustApp/1.0 (github.com/darshan02parmar)', // Nominatim requires a valid User-Agent
          'Accept-Language': 'en'
      }
      
    });
    if (response.data.length > 0) {
      listing.geometry = {
        type: 'Point',
        coordinates: [
          parseFloat(response.data[0].lon),
          parseFloat(response.data[0].lat)
        ]
      };
    }
  }
  if (typeof req.file != 'undefined') {
    listing.image = {
      filename: req.file.filename,
      url: req.file.path
    };
  }
  await listing.save();
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted.!!")
    res.redirect("/listings");
});

// Filter by category name (matches against title/description)
module.exports.filterByCategory = async (req, res) => {
  const { category } = req.params;
  // Prefer explicit category field; fallback to title/description match
  const allListing = await Listing.find({ $or: [
    { category },
    { title: new RegExp(category.replace(/-/g, ' '), 'i') },
    { description: new RegExp(category.replace(/-/g, ' '), 'i') }
  ]});
  res.render("listings/index.ejs", { allListing, category });
};

// Search across multiple fields with optional category constraint
module.exports.searchListings = async (req, res) => {
  const { q = '', category } = req.query;
  const conditions = [];
  if (q) {
    const regex = new RegExp(q, 'i');
    conditions.push({ title: regex }, { location: regex }, { country: regex }, { description: regex });
    const asNumber = Number(q);
    if (!Number.isNaN(asNumber)) {
      // include price equal or less-than match for numeric queries
      conditions.push({ price: asNumber });
    }
  }
  let filter = conditions.length ? { $or: conditions } : {};
  if (category) {
    const catRegex = new RegExp(category.replace(/-/g, ' '), 'i');
    filter = { $and: [ filter, { $or: [ { category }, { title: catRegex }, { description: catRegex } ] } ] };
  }
  const allListing = await Listing.find(filter);
  res.render("listings/index.ejs", { allListing, q, category });
};