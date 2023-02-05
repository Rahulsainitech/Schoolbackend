const express = require("express");
const router = express.Router();
const Allimage = require('../models/imageModel')
const cloudinary=require("cloudinary").v2;
cloudinary.config({
  cloud_name: "geeta9812",
  upload_preset:"Instaclone",
      folder:"Assets",
  api_key: "662433466342375",
  api_secret: "gFRDwh3ka4B7-38i5LXb9kiebx4"
});

router.post("/pic", async (req, res) => {
  console.log(req.body)
   const {image,description,category,public_id } = req.body;
   const newUser = new Allimage({image,description,category,public_id});
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

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email,password)
//   try {
//     const user = await Allimage.find({ email, password });
//     if (user.length > 0) {
//       const currentUser = {
//         name: user[0].name,
//         email: user[0].email,
//         isAdmin: user[0].isAdmin,
//         _id: user[0]._id,
//       };
//       res.status(200).send(currentUser)
//     } else {
//         res.status(400).json({message:"Login failed"})
//     }
//   } catch (error) {
//       res.status(404).json({message:"Oops! something went wrong try again after some time"})
//   }
// });

router.get("/getallpic",async (req,res)=>{
  try {
    const users = await Allimage.find({})
    res.status(200).send(users)
  } catch (error) {
    res.status(404).json({message:error.stack})
  }
})

router.get("/getsplpic",async (req,res)=>{
  try {
    const users = await Allimage.find({"category":"Weekly activity"})
    res.status(200).send(users)
  } catch (error) {
    res.status(404).json({message:error.stack})
  }
})

router.post("/delimage",async(req,res)=>{
  console.log(req.body.id,req.body.link)
  const public_id = req.body.public_id
  const userid = req.body.id
  
  try {
    await cloudinary.uploader.destroy(public_id,function(result,error)
     {
        console.log(result, error) })
        .then(resp => console.log("image delete successfullu",link))
        .catch(_err=> console.log("Something went wrong, please try again later."));
        await Allimage.findOneAndDelete({_id:userid});
        res.status(200).send({status:"User Deleted"})
  } catch (error) {
    res.status(404).json({message:error.stack});
  }
}
)

router.post("/addnewadmin",async(req,res)=>{
  const userid = req.body.userid
  console.log(userid)
  try {
      const user = await Allimage.findById({_id:userid})
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
