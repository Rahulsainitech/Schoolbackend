const mongoose = require("mongoose");

const studentShema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    father:{
        type:String,
        required:[true,"Email is required"]
    },
    mother:{
        type:String,
        required:[true,"Email is required"]
    },
    phone:{
        type:Number,
        required:[true,"Phone is required"]
    },
    dob:{
        type:String,
        required:true
    },
    regno:{
        type:Number,
        default:false
    },
    gen:{
        type:String,
        default:"male"
    },
    cls:{
        type:String,
        required:true
    },
    rollno:{
        type:Number,
        defult:00
    },
    add:{
        type:String,
        required:true
    },
    url:{
        type:String,
        defult:"https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
    },
    password:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model("ABCStudent",studentShema)