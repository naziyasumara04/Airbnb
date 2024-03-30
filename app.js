const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate=require("ejs-mate");
const app = express();

const port = 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs",ejsMate);

main()
    .then(() => {
        console.log("yoo!! success");
    })
    .catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.get("/", (req, res) => {
    res.send("This is root directory");
});
app.get("/listings", async (req, res) => {
    let alllistings = await Listing.find({});
    res.render("listings/index.ejs", { alllistings });

});
//new route:
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});
// <!--show route-->
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });

});
//create route:
app.post("/listings",async(req,res)=>{
    let newlisting = new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
  });
//edit route:
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

});
//update route:
app.put("/listings/:id",async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
});
//delete route:

app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedlisting=await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listings");
});


// app.get("/testlisting",(req,res)=>{
//     const sampleListing=new Listing({
//         title:"My new villa",
//         description:"by the beach",
//         price:1200,
//         location:"calaenagth,goa",
//         country:"India"
//     });
//     sampleListing.save()
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
//     console.log("saved");
//     res.send("saved");
// });

app.listen(port, () => {
    console.log(`I am listening on this ${port}`);
});