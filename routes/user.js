const express = require("express");
const router = express.Router();
const Content = require("../models/Content");
const User = require("../models/User");
const Views = require("../models/Views");

const catchErrors = fn => {
  return function(...params) {
    console.log(params);
    return fn(...params).catch(err => {
      console.log(err.message);
    });
  };
};

async function findUser(req, res, next) {
  const user = req.params.user;
  const allContent = await User.find({ username: user });
  const [{ _id }] = allContent;
  const userDetails = await Content.find({ owner: _id });
  res.json(userDetails);

  // User.find({ username: user }).then(allContent => {
  //   // console.log("here", allContent);
  //   const id = allContent[0]._id;

  //   Content.find({ owner: id })
  //     .then(userDetails => {
  //       res.json(userDetails);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // });
}

//Getting all the documents from a user
// router.get("/api/:user", (req, res) => {
//   const user = req.params.user;
//   User.find({ username: user }).then(allContent => {
//     // console.log("here", allContent);
//     const id = allContent[0]._id;

//     Content.find({ owner: id })
//       .then(userDetails => {
//         res.json(userDetails);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });
// });

router.get("/api/:user", catchErrors(findUser));

// Get all the data from a content Id and a User
router.get("/api/:user/:id", (req, res) => {
  console.log(req.params);
  console.log(req.params);
  const { id } = req.params;
  // console.log("Hello");
  Content.findById(id)
    .populate("owner")
    .then(response => {
      console.log("AAAAAAAAAH", response);
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

//This is for the face detections route

//For the moment we use this one to update the content data
// router.put("/api/:id", (req, res) => {
//   const {
//     angry,
//     disgusted,
//     fearful,
//     happy,
//     neutral,
//     sad,
//     surprised
//   } = req.body;

//   const ageValue = req.body.age;
//   const genderValue = req.body.gender;
//   const emotions = {
//     angry,
//     disgusted,
//     fearful,
//     happy,
//     neutral,
//     sad,
//     surprised
//   };

//   Content.findById(req.params.id).then(project => {
//     const avgEm = project.averageEmotion;
//     const maxEm = project.maxEmotion;
//     let counter = 1;
//     const avgEmotionsArr = Object.keys(avgEm);
//     const maxEmotionsArr = Object.keys(maxEm);
//     for (let avg in emotions) {
//       maxEm[maxEmotionsArr[counter]].push(emotions[avg][0]);
//       avgEm[avgEmotionsArr[counter]].push(
//         avg === "neutral"
//           ? emotions[avg][1]
//           : emotions[avg][1] > 0.1
//           ? true
//           : false
//       );
//       counter++;
//     }
//     //avg===neutral? emotions[avg][1]:emotions[avg][1]>0.1?true:false;
//     const gender = project.gender;
//     const age = project.age;
//     gender.push(genderValue);
//     age.push(ageValue);
//     const averageEmotion = avgEm;
//     const maxEmotion = maxEm;
//     // console.log("Avgemotion ",averageEmotion," Max emotion: ", maxEmotion, " age: ", age, " gender: ", gender);
//     Content.findByIdAndUpdate(
//       req.params.id,
//       { averageEmotion, maxEmotion, age, gender },
//       { new: true }
//     ).then(updated => {
//       res.json(updated);
//     });
//     res.json(project);
//   });
// });

async function getViews(req, res) {
  const views = req.body.views;
  const updated = await Content.findByIdAndUpdate(
    req.params.id,
    { views },
    { new: true }
  ).populate("owner");

  res.json(updated);
}
router.put("/api/views/:id", catchErrors(getViews));
// router.put("/api/views/:id", (req, res) => {
//   const views = req.body.views;
//   Content.findByIdAndUpdate(req.params.id, { views }, { new: true })
//     .populate("owner")
//     .then(updated => {
//       res.json(updated);
//     });
// });

module.exports = router;
