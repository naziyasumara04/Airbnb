const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const listingSchema=new Schema({
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
    },
    image:{
        type:String,
        default:"https://unsplash.com/photos/an-underwater-view-of-a-colorful-coral-reef-HYHYGLs-Rp8",
        set:(v)=>
        v===" "?"https://unsplash.com/photos/an-underwater-view-of-a-colorful-coral-reef-HYHYGLs-Rp8"
        :v,
        filename:String,
        url:String

    },
    price:{
        type:Number,

    },
    location:{
       type:String
    },
    country:{
        type:String
    }



});

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;