const express = require("express");
const router = express.Router();
const facultyUser = require("../models/facultyModal");

router.post("/facultyregister", async (req, res) => {
  console.log("facultyData",req.body)
  
   const { name, email,dob,regno,gen,qual,phone,add,interst,admin,url, password } = req.body;
   const newUser = new facultyUser({ name, email,dob,regno,gen,qual,phone,add,interst,admin,url, password });
   console.log(newUser,"Rahul")
   try {
     await newUser.save();
     res.status(200).json({
       success: true,
       message: "Register Success",
     });
   } catch (error) {
     console.log("errrrr",error)
     res.status(400).json({
       message: error,
     });
   }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)
  try {
    const user = await facultyUser.find({ email, password });
    if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0]._id,
      };
      res.status(200).send(currentUser)
    } else {
        res.status(400).json({message:"Login failed"})
    }
  } catch (error) {
      res.status(404).json({message:"Oops! something went wrong try again after some time"})
  }
});

router.get("/getallusers",async (req,res)=>{
  try {
    const users = await facultyUser.find({}).select("-password")
    // console.log(users)
    res.status(200).send(users)
  } catch (error) {
    res.status(404).json({message:error.stack})
  }
})

router.get("/getallfacultyimages",async (req,res)=>{
  try {
    const users = await facultyUser.find({}).select("url")
    console.log(users)
    res.status(200).send(users)
  } catch (error) {
    res.status(404).json({message:error.stack})
  }
})

router.post("/deleteuser",async(req,res)=>{
  const userid = req.body.userId
  try {
    await facultyUser.findOneAndDelete({_id:userid});
    res.status(200).send("User Deleted")
  } catch (error) {
    res.status(404).json({message:error.stack});
  }
})

router.post("/addnewadmin",async(req,res)=>{
  const userid = req.body.userid
  console.log(userid)
  try {
      const user = await facultyUser.findById({_id:userid})
      if (user.isAdmin ){
        user.isAdmin=false
        await user.save()
      }else{
        user.isAdmin=true
        await user.save()
      }
      
      res.status(200).send("Edit as admin success")
  } catch (error) {
      res.status(400).json({
          message:"Something went wrong",
          error:error.stack
      })
  }
})
module.exports = router;
