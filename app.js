if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}


const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path")
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');


const dbUrl=process.env.ATLASDB_URL;

// MongoDB connection
async function main() {
  if (!dbUrl) {
    throw new Error("ATLASDB_URL environment variable is not set!");
  }
  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB Atlas successfully!");
}
main().catch(err => console.error("MongoDB Connection Error:", err));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*60*60 // time period in seconds
});
store.on("error",function(e){
    console.log("SESSION STORE ERROR",e);
});

const sessionOption={
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie: {
        maxAge:7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly:true,
        secure: process.env.NODE_ENV === "production", // secure cookies in production
        sameSite: 'lax'
    }
}
// app.get("/",(req,res)=>{
//     res.send("Hello I'm root");
// });


app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user;
    next();
});

// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new User({
//         username:"demouser",email:"demo-email"
//     });
//     let newUser=await User.register(fakeUser,"demopassword");
//     res.send(newUser);
// });

const reviews = require("./routes/review.js"); // Express Router
app.use("/listings/:id/reviews", reviews);

const listings= require("./routes/listing.js"); // Express Router
app.use("/listings", listings);

// Root route - redirect to listings (must be before user routes mounted at "/")
app.get("/", (req, res) => {
    res.redirect("/listings");
});

const users = require("./routes/user.js"); // Express Router
app.use("/", users);


//if no route matches → 404 handler
app.use((req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});


// error handler middleware (must come last)
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    console.error(err); // log full error for debugging
    res.status(statusCode).render("error.ejs", { message });
});


const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});