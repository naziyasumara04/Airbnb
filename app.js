const express=require("express");
const ejs=require("ejs");
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const app=express();

const port=3000;

main()
.then(()=>{
    console.log("yoo!! success");
})
.catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.get("/",(req,res)=>{
    res.send("This is root directory");
});
app.get("/testlisting",(req,res)=>{
    const sampleListing=new Listing({
        title:"My new villa",
        description:"by the beach",
        price:1200,
        location:"calaenagth,goa",
        country:"India"
    });
    sampleListing.save()
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    });
    console.log("saved");
    res.send("saved");
});

app.listen(port,()=>{
    console.log(`I am listening on this ${port}`);
});