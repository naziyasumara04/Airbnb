const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema}=require("./schema.js");

const app = express();

const port = 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));

app.engine("ejs",ejsMate);

main()
    .then(() => {
        console.log("yoo!! success");
    })
    .catch(err => console.log(err));


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

function validatelisting(req,res,next){
    let {error}=listingSchema.validate(req.body);
    console.log(error);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        let err=new ExpressError(errMsg,400);
        return next(err);
    }
    next();
}

app.get("/", (req, res) => {
    res.send("This is root directory");
});



app.get("/listings", wrapAsync(async (req, res) => {
    let alllistings = await Listing.find({});
    // console.log(alllistings);
    res.render("listings/index.ejs", { alllistings });
}));


//new route:
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

// <!--show route-->
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
}));

//create route:
app.post("/listings",validatelisting,wrapAsync(async(req,res,next)=>{
   
   
    // let newlisting = new Listing(req.body.listing);
    
    // await newlisting.save();
    // res.redirect("/listings");
    let {title, description, image, price, country, location} = req.body.listing;
    const newListing = new Listing({
        title:title,
        description:description,
        location:location,
        country:country,
        price:price,
    });
    newListing.image.url = image;
    await newListing.save();
    console.log(newListing);
    res.redirect("/listings");
  }));
   
  
//edit route:
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//update route:
app.put("/listings/:id",validatelisting,wrapAsync(async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Enter valid information");
    }
//   let {id}=req.params;
//   let {title, image, description, location, country, price}  = req.body.listing;

//   await Listing.findByIdAndUpdate(id,{...req.body.listing});
//   res.redirect(`/listings/${id}`);

//new one:
//   app.put("/:id", wrapAsync(async (req, res, next) => {
    let {id} = req.params;
    let {title, image, description, location, country, price}  = req.body.listing;
    
    let newL = await Listing.findByIdAndUpdate(id, {
        title:title,
        description:description,
        location:location,
        country:country,
        price:price,
        'image.url' :image
    }, {new:true});
    console.log(newL);
    res.redirect(`/listings/${id}`);
    })
);
// }));
//delete route:

app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedlisting=await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listings");
}));


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
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not Found"));
});

app.use((err,req,res,next)=>{
    let{status=500,message="something went Wrong"}=err;
    res.status(status).send(message);
    res.render("error.ejs",{message,status});
});

app.listen(port, () => {
    console.log(`I am listening on this ${port}`);
});