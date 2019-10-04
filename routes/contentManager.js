const express = require("express");
const router  = express.Router();
const Content = require("../models/Content");
const User=require("../models/User");
router.get("/",(req,res)=>{
      Content.find({owner:req.user._id}).then(response=>{
        res.json(response)
      }).catch(err=>{
        res.json(err)
      })
  
   
})

router.post("/add",(req,res)=>{
    const {url,title,contentType}=req.body;
    const owner=req.user._id;
    const date = new Date().toJSON().slice(0,10).replace(/-/g,'/')
      User.findById(req.user._id).then(found=>{
        Content.create({url,title,date,contentType,owner}).then(response=>{
          console.log(response)
          res.json(response)
        })
      })
     

})

router.delete("/:id",(req,res)=>{
  const contentId=req.params.id;
  
  Content.findById(contentId).then(proyect=>{
    console.log(proyect.owner)
    if(req.user && JSON.stringify(proyect.owner)===JSON.stringify(req.user._id)){
      console.log("hello")
      Content.findByIdAndDelete(contentId).then(response=>{

        res.json({message:"ok"})
      }).catch(err=>{
        console.log(err)
      })
  
    }
    
   else {
     res.json({message:"not ok bro not okay"})
   }
  }).catch(err=>{
    console.log(err)
  })
      
})

router.get("/:id",(req,res)=>{
  console.log(req.params.id)
      Content.findById(req.params.id).then(response=>{
        res.json(response)
      }).catch(err=>{
        console.log(err)
      })
})


module.exports=router;