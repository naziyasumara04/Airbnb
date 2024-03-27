const express=require("express");
const ejs=require("ejs");
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const app=express();

const port=3000;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

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
app.get("/listings",async(req,res)=>{
    let alllistings=await Listing.find({});
    res.render("listings/index.ejs",{alllistings});
    
});
// <!--show route-->
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});

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

app.listen(port,()=>{
    console.log(`I am listening on this ${port}`);
});