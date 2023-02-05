const newsevent = require("../models/newsModal");
const express = require("express");
const Router = express.Router();

Router.post("/news", async (req, res) => {
  console.log(req.body);
  const { title, subtitle, description, pic } = req.body;
  console.log(title,subtitle,description,pic)
  const news = new newsevent({ title, subtitle, description, pic });
  console.log("news and modal",news)
  try {
    await news.save();
    res.status(200).json({
      success: true,
      message: "Register Success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error,
    });
  }
});

Router.get("/getallnews",async (req,res)=>{
  try {
    const allnews = await newsevent.find({})
    res.status(200).send(allnews)
  } catch (error) {
    res.status(404).json({message:error.stack})
  }
})

module.exports = Router;
