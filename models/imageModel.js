const mongoose = require("mongoose");


const imageShema = mongoose.Schema({
    image:{
        type:String,
        required:[true,"Image link is required"]
    },
    public_id:{
       type:String,
       required:[true,"public_id is reqruied"]
    },
    description:{
        type:String,
        required:[true,"desc is required"]
    },
    category:{
        type:String,
        required:[true,"category is required"]
    }
},{timestamps:true})

module.exports = mongoose.model("Allimage",imageShema)