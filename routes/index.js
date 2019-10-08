const express = require("express");
const router = express.Router();
const Content = require("../models/Content");
const User = require("../models/User");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.put("/api/:user", (req, res) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  User.findByIdAndUpdate(
    req.params.user,
    { username, password: hashPass },
    { new: true }
  ).then(update => {
    res.json(update);
  });
});
module.exports = router;
