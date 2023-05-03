const express=require('express');
const app=express()
const mongoose=require('mongoose')
const userModel=require('./schme')
app.use(express.urlencoded({ extended: true }));

var ObjectId = require('mongoose').Types.ObjectId; 


const url="mongodb://localhost:27017/fakeuser"
mongoose.connect(url,{
    // useMongoClient:true,
    // useUnifiedTopology:true
}).then((res)=>{
    console.log("db connected")
}).catch((err)=>{
    console.log(err)
})



app.get('/user',(req,res)=>{
    userModel.find()
   .then((user)=>{
    res.json({
        status:true,
        payload:user
    })
   }).catch((err)=>{
    res.json({
        success:false,
        payload:err
    })
   })
})
app.get('/user/:id',(req,res)=>{
    const {id}=req.params
    console.log("id",id)
    var query = {_id: new ObjectId(id) };
    console.log("query",query)
   
    userModel.find(query).then(user=>{
        res.json(user)
    }).catch((err)=>{
        res.json({
            success:false
        })
    })
})

app.post('/user',(req,res)=>{
    const {name,phone}=req.body

    const body=req.body
    if(!name && !phone){
      return   res.status(404).json({
            success:false,
            err:"please enter valid details"
        })

    }
   const newData= userModel(body)
   newData.save().then((user)=>{
    
    res.json({
        status:true,
        payload:user
    })
   }).catch((err)=>{
    res.status(500).json({
        success:false,
        err:"server error"
    })
   })
})



app.listen(5000)

