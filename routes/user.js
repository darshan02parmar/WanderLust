const express = require('express');
const router = express.Router();
const User = require('../models/user');  // import User model
const { userSchema } = require('../schema');
const ExpressError = require('../utils/ExpressError');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const {savedRedirectUrl} = require('../middleware');
const usercontroller = require('../controllers/users');


//Signup Routes
router
  .route("/signup")
  .get(usercontroller.renderSignupForm)
  .post(wrapAsync(usercontroller.signup));

//Login Routes
router
  .route("/login")
  .get(usercontroller.renderLoginForm)
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: "Invalid username or password",
    }),
    usercontroller.login
  );
//Logout Route
router.get("/logout", usercontroller.logout);


module.exports = router;
