const express = require("express");
const router = express.Router();
const Content = require("../models/Content");
const User = require("../models/User");
const Views = require("../models/Views");

router.get("/:id",(req,res)=>{
  Views.find({contentId:req.params.id}).then(founded=>{
      res.json(founded);
      console.log(founded)
  })
})






module.exports = router;
