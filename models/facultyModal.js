const mongoose = require("mongoose");

const facultyShema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    dob:{
        type:String,
        required:true
    },
    regno:{
        type:String,
        required:true
    },
    gen:{
        type:String,
        required:true
    },
    qual:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    add:{
        type:String,
        required:true
    },
    interst:{
        type:String,
        required:true
    }
    ,
    password:{
        type:String,
        required:[true,"password is required"]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    url:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
    }
},{timestamps:true})

module.exports = mongoose.model("ABCFaculty",facultyShema)