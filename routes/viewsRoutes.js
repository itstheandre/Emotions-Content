const express = require("express");
const router = express.Router();
const Content = require("../models/Content");
const User = require("../models/User");
const Views = require("../models/Views");


//CREATE NEW VIEW WITH CONTENT ID REF
router.post("/:id", (req,res)=>{
 const contentId = req.params.id

  
  Views.create({contentId}).then(created=>{
    return Content.findByIdAndUpdate(contentId, {$push: {views: created._id}}).then(() =>{
      res.json(created)
    }).catch(err =>{
      console.log(err)
    })
    
    res.json(created);
  })
})
//Update the current view.
router.put("/:id",(req,res)=>{
  const {
    angry,
    disgusted,
    fearful,
    happy,
    neutral,
    sad,
    surprised,
    time,
    age,
    gender
  } = req.body;
  const contentId=req.params.id;
  
  averageEmotion={
    angryAvg: (angry[1]>0.1?true:false),
    disgustedAvg: (disgusted[1]>0,1?true:false),
    fearfulAvg: (fearful[1]>0.1?true:false),
    happyAvg: (happy[1]>0.1?true:false),
    neutralAvg: neutral[1]*100,
    sadAvg: (sad[1]>0.1?true:false),
    surprisedAvg: (surprised[1]>0.1?true:false)
  }
  maxEmotion={
    angryMax: angry[0],
    disgustedMax: disgusted[0],
    fearfulMax: fearful[0],
    happyMax: happy[0],
    neutralMax: neutral[0],
    sadMax: sad[0],
    surprisedMax: surprised[0]
  }
 
   
      Views.findByIdAndUpdate(req.params.id,{averageEmotion,maxEmotion, age, gender,time},{new:true}).then(updated=>{
        res.json(updated);
      
    }).catch(err=>{res.json(err)})
})



module.exports=router;