const mongoose = require("mongoose")

const tableSchema = mongoose.Schema({
    standard:{
        type:Number,
        required:true
    },
    classTimeTable:{
        type:Array,
        required:true,
    }
})
module.exports = mongoose.model("timetable", tableSchema);