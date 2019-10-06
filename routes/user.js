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

module.exports = router;
