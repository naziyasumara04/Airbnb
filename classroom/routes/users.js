const express=require("express");
const router=express.Router();

//USERS
//index -users
router.get("/",(req,res)=>{
    res.send("I am get user");
});

//edit -users
router.get("/:id",(req,res)=>{
    res.send("i am get id for users");
});

//post-users
router.post("/",(req,res)=>{
    res.send("i am post for users");
});

//delete - users
router.delete("/:id",(req,res)=>{
    res.send("i am delete for users");
});


module.exports=router;


