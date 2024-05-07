const Listing = require("../models/listing.js");
module.exports.index=async (req, res) => {
    let alllistings = await Listing.find({});
    res.render("listings/index.ejs", { alllistings });
}

module.exports.renderNewForm=async(req,res)=>{
    // console.log(req.user);
   
    res.render("listings/new.ejs",);
};

module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
    path:"reviews",
    populate:{
    path:"author",
    }})
    .populate("owner");
    if(!listing){
        req.flash("error","Listing which you requested for is not exists");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing=async(req,res,next)=>{
    let {title, description, image, price, country, location} = req.body.listing;
    const newListing = new Listing({
        title:title,
        description:description,
        location:location,
        country:country,
        price:price,
    });
    newListing.image.url = image;
    console.log(req.user);
    newListing.owner=req.user._id;
    await newListing.save();

    req.flash("success","new listing created");
    console.log(newListing);
    res.redirect("/listings");
  };

  module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing which you requested for is not exists");
        res.redirect("/listings");
    }
    // req.flash("success","Listing reated");
    res.render("listings/edit.ejs",{listing});
}

module.exports.updateListing=async(req,res)=>{
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
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
    }


    module.exports.destroyListing=async(req,res)=>{
        let {id}=req.params;
        let deletedlisting=await Listing.findByIdAndDelete(id);
        req.flash("success","Listing Deleted!");
        console.log(deletedlisting);
        res.redirect("/listings");
    }