const express = require("express");
const router = express.Router();
const Content = require("../models/Content");
const User = require("../models/User");
const Views = require("../models/Views");

router.get("/all/:name",(req,res)=>{
  const username = req.params.name;
  console.log(username)
  User.find({ username }).then(allContent => {
    // console.log("here", allContent);
    const id = allContent[0]._id;

    Content.find({ owner: id }).populate("views").then(userDetails => {
      res.json(userDetails);
    });
  });
})


router.get('/:id', (req, res) => {
  const {id} = req.params
  Content.findById(id).populate("views").then(response => {
    // console.log(response.views)
    res.json(response.views)
  })
})





module.exports = router;
