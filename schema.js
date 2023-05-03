const mongoose=require('mongoose')


const schema=new mongoose.Schema({
    name:String,
    phone:String
})

module.exports= mongoose.model("user", schema);