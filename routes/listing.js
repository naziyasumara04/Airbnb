const express=require("express");
const router=express.Router();
const Listing = require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");




function validatelisting(req,res,next){
    let {error}=listingSchema.validate(req.body);
    // console.log(error);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
        // return next(err);
    }
    else{
    next();
    }
};

//index route
router.get("/", wrapAsync(async (req, res) => {
    let alllistings = await Listing.find({});
    res.render("listings/index.ejs", { alllistings });
}));


//new route:
router.get("/new",async(req,res)=>{
    res.render("listings/new.ejs",);
});

// show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
}));

//create route:
router.post("/",validatelisting,wrapAsync(async(req,res,next)=>{
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
router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//update route:
router.put("/:id",validatelisting,wrapAsync(async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Enter valid information");
    }
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

//delete route:

router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedlisting=await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listings");
}));

module.exports=router;