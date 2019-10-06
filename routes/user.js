

const express = require("express");
const router = express.Router();
const Content = require("../models/Content");
const User = require("../models/User");

router.get("/api/:user", (req, res) => {
  console.log(req.params.user);
  const user = req.params.user;
  User.find({ username: user }).then(allContent => {
    console.log("here", allContent);
    const id = allContent[0]._id;

    Content.find({ owner: id }).then(userDetails => {
      res.json(userDetails);
    });
  });
});

router.get("/api/:user/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  console.log("Hello");
  Content.findById(id)
    .populate("owner")
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/api/:id",(req,res)=>{
  /*
   faceDetection = {
     angry,
   disgusted,
   fearful,
   happy,
   neutral,
   sad,
   surprised,
   age,
   gender
 };
  */
    const {angry,
      disgusted,
      fearful,
      happy,
      neutral,
      sad,
      surprised,
      }=req.body;
    
      const ageValue = req.body.age;
      const genderValue = req.body.gender
      const emotions = {angry, disgusted, fearful, happy, neutral, sad, surprised}
      console.log(emotions)
      console.log(req.params.id)
      Content.findById(req.params.id)
      .then(project=>{
        console.log(project.averageEmotion)
        console.log("HERE MOFO",project.averageEmotion["angryAvg"])
        const avgEm=project.averageEmotion;
        const maxEm=project.maxEmotion;
        let counter=1;
        const avgEmotionsArr = Object.keys(avgEm);
        console.log(avgEmotionsArr)
        const maxEmotionsArr = Object.keys(maxEm)
         for (let avg in emotions){
           maxEm[maxEmotionsArr[counter]].push(avg[0])
           avgEm[avgEmotionsArr[counter]].push(avg[1])
           counter++;
         }

        const gender = project.gender.push(genderValue);
        const age = project.age.push(ageValue)
      
        const averageEmotion = avgEm;
        const maxEmotion = maxEm;
        Content.findByIdAndUpdate(req.params.id, {averageEmotion, maxEmotion, age, gender}, { new: true }).then(response => {
          res.json(response)
        })
          
          

        res.json(response)
      })

})

module.exports = router;
