const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const {keys} = require("./config/keys");
const morgan= require("morgan");
const mongoose = require("mongoose");
const cors=require('cors');

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/student",require("./Routers/studentRoute"))
app.use("/api/faculty",require("./Routers/facultyRoute"))
app.use("/api/gallery",require("./Routers/imageRoute"))
app.use("/api/news&event",require("./Routers/newsRouter"))
app.use("/api/faq",require("./Routers/queRouter"))
app.use("/api/payment",require("./Routers/paymentRoute"))
//database connection
mongoose.set('strictQuery', true)
mongoose.connect(keys)
.then(()=>{console.log("connection is successfull")})
.catch((err)=>console.log(err,"real error"))

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(port,()=>{
    console.log(`server is listtening on ${port}`)

})