const express = require("express");
const router  = express.Router();
const Content = require("../models/Content");

router.get("/",(req,res)=>{
    Content.find().then(response=>{
      res.json(response)
    }).catch(err=>{
      res.json(err)
    })

})

router.post("/add",(req,res)=>{
    const {url,title,contentType}=req.body;
  
    const date = new Date().toJSON().slice(0,10).replace(/-/g,'/')
      Content.create({url,title,date,contentType}).then(response=>{
      console.log(response)
      res.json(response)
    }).catch(err=>{
      res.json(err)
    })

})
module.exports=router;