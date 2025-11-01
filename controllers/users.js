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
            req.session.save((err) => {
                if (err) {
                    console.error("Session save error:", err);
                    return res.redirect("/signup");
                }
                res.redirect("/listings");
            });
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
  
  // Ensure session is saved before redirect
  req.session.save((err) => {
    if (err) {
      console.error("Session save error:", err);
      return res.redirect("/login");
    }
    res.redirect(redirectUrl);
  });
};

module.exports.logout=(req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      req.flash("success", "You have logged out!");
      res.redirect("/listings");
    });
  });
};