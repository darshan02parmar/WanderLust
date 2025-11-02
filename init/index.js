const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const ExpressError=require("../utils/ExpressError.js");

if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const dbUrl = process.env.NODE_ENV !== "production" ? "mongodb://127.0.0.1:27017/wanderlust" : process.env.ATLASDB_URL;

main()
    .then(() =>{
         console.log(`Connected to MongoDB ${process.env.NODE_ENV !== "production" ? "locally" : "Atlas"} successfully!`);
    })
    .catch((err)=>{
        console.error("MongoDB Connection Error:", err);
    });

async function main(){
    if (!dbUrl) {
      throw new Error("ATLASDB_URL environment variable is not set!");
    }
    await mongoose.connect(dbUrl);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"68d97480a693939743f4465f"})); // Replace with a valid user ID from your database   
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data");
};
initDB();