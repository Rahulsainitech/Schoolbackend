const queevent = require("../models/faqModel");
const timetable = require("../models/timetable");
const express = require("express");
const Router = express.Router();

Router.post("/addfaq", async (req, res) => {
  console.log(req.body);
  const { que,ans } = req.body;
  console.log("que",que,ans)
  const faq = new queevent({ que,ans});
  console.log("faq and modal",faq)
  try {
    await faq.save();
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

Router.get("/getallfaq",async (req,res)=>{
    try {
      const allQues = await queevent.find({})
      res.status(200).send(allQues)
    } catch (error) {
      res.status(404).json({message:error.stack})
    }
  })
 
Router.post("/timetable",async(req,res)=>{
  // console.log(req.body);
    const {timeTable,standard} = req.body
    // console.log(classTimeTable)
  try {
    const timeTables= new timetable({classTimeTable:timeTable,standard:standard})
    await timeTables.save()
    res.status(200).json({
      success: true,
      message: "TimeTable Success",
    });
  } catch (error) {
    console.log(error)
  }
})
Router.get("/timetable",async (req,res)=>{
  try {
    const timetables = await timetable.find({})
    res.status(200).send(timetables)
    console.log(timetables)
  } catch (error) {
    console.log(error)
    res.status(404).json({message:error.stack})
  }
})
module.exports = Router;
