const Joi = require('joi');

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().min(0).required(),
    // allow optional category field from the form
    category: Joi.string().allow('', null),
     image: Joi.object({
       url: Joi.string().uri().allow('', null),
       filename: Joi.string().allow('', null)
     }).optional(),
    geometry: Joi.object({
      type: Joi.string().valid('Point').required(),
      coordinates: Joi.array()
        .ordered(Joi.number().strict(false), Joi.number().strict(false))
        .required()
    }).optional()
  }).required()   // <-- important
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required()
  }).required()   // <-- important
});

module.exports.userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});