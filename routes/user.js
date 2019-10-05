

const express = require("express");
const router = express.Router();
const Content = require("../models/Content");

router.get("/api/:user/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  console.log("Hello");
  Content.findById(id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/api/:user/:id",(req,res)=>{
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
      Content.findById(req.params.id)
      .then(project=>{
        const avgEm=project.averageEmotion;
        const maxEm=project.maxEmotion;
        let counter=0;
        const avgEmotionsArr = Object.keys(avgEm);
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
        Content.findByIdAndUpdate(req.params.id, {averageEmotion, maxEmotion, age, gender})
          
          

        res.json(response)
      })

})

module.exports = router;
