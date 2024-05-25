const express=require("express");
const router=express.Router();
const Listing = require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const {isLoggedIn,isOwner,validatelisting}=require("../middleware.js");
const listingController=require("../controllers/listings.js");

const multer  = require('multer');

const {storage}=require("../cloudConfig.js");
const upload = multer({storage});


//index route & //create route:
router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),validatelisting,wrapAsync(listingController.createListing));
// .post(, (req,res)=>{
// res.send(req.file);
// });

//new route:
router.get("/new",isLoggedIn,listingController.renderNewForm);

// show route & edit route & update route & delete route:
router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,
isOwner,
// upload.single["listing[image]"],
upload.single("listing[image]"),
validatelisting,
wrapAsync(listingController.updateListing))
.delete(isLoggedIn,
isOwner,
wrapAsync(listingController.destroyListing));


//edit route:
router.get("/:id/edit",
isLoggedIn,
isOwner,
wrapAsync(listingController.renderEditForm))


module.exports=router;