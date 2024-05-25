const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
            filename: String,
            url: {
                type:String,
                default:"https://images.unsplash.com/photo-1506126279646-a697353d3166?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8aG9tZXx8fHx8fDE3MTI1NTQwMTM&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600",
                set:(v)=> v === ""?"https://images.unsplash.com/photo-1506126279646-a697353d3166?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8aG9tZXx8fHx8fDE3MTI1NTQwMTM&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600":v,
            }
    },

    price: {
        type: Number,
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews:[
        {
        type:Schema.Types.ObjectId,
        ref:"Review"
        }

    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
   geometry:{
    type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
}
});


listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews }})
    }
})


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;