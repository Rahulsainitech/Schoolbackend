const mongoose = require('mongoose')

const faqSchema = new mongoose.Schema({
    que:{
        type:String,
        required:true
    },
    ans:{
        type:String,
        required:true
    }
},
{timestamps:true}
)

module.exports = mongoose.model("question",faqSchema)