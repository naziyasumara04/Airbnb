const express=require("express");
const router=express.Router();


//index 
router.get("/",(req,res)=>{
    res.send("I am get posts");
});

//edit 
router.get("/:id",(req,res)=>{
    res.send("i am get id for posts");
});

//post
router.post("/",(req,res)=>{
    res.send("i am post for posts");
});

//delete 
router.delete("/:id",(req,res)=>{
    res.send("i am delete for posts");
});

module.exports=router;