const mongoose =require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const path=require("path");

main()
    .then(() => {
        console.log("yoo!! success");
    })
    .catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB=async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj, owner:'662350ac3831812d779f5ac9'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");

}

initDB();