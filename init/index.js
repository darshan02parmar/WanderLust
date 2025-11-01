const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const ExpressError=require("../utils/ExpressError.js");
const mongoURL = "mongodb://127.0.0.1:27017/wanderlust";
main()
    .then(() =>{
         console.log("connected to MongoDB");
    })
    .catch((err)=>{
        console.error(err);
    });

async function main(){
    await mongoose.connect(mongoURL);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"68d97480a693939743f4465f"})); // Replace with a valid user ID from your database   
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data");
};
initDB();