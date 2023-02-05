const express = require("express");
const router = express.Router();
const studentUser = require("../models/student");

router.post("/studentregister", async (req, res) => {
  console.log("rahl",req.body)
   const { name,father,mother,dob,regno,gen,cls,rollno,url,add,phone, password } = req.body;
   const newUser = new studentUser({ name,father,mother,phone,dob,regno,gen,cls,rollno,add,url,password });
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
  const {name,regno } = req.body;
  console.log(name,regno)
  try {
    const user = await studentUser.find({ name,regno });
    if (user.length > 0) {
      const currentUser = {
        name: user[0].name,
        dob:user[0].dob,
        rollno:user[0].rollno,
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

router.get("/getallstudents",async (req,res)=>{
  try {
    const users = await studentUser.find({})
    res.status(200).send(users)
  } catch (error) {
    res.status(404).json({message:error.stack})
  }
})

router.post("/deleteuser",async(req,res)=>{
  const userid = req.body.userId
  try {
    await studentUser.findOneAndDelete({_id:userid});
    res.status(200).send("User Deleted")
  } catch (error) {
    res.status(404).json({message:error.stack});
  }
})

router.post("/addnewadmin",async(req,res)=>{
  const userid = req.body.userid
  console.log(userid)
  try {
      const user = await studentUser.findById({_id:userid})
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
