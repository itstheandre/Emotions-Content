const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") });
});

router.post("/login", (req, res) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    req.login(user, err => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error while attempting to login" });
      }
      return res.json(user);
    });
  })(req, res);
});

router.post("/signup", (req, res, next) => {
  const { username, password, fullName } = req.body;
  console.log(username, password, fullName);
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Need to have more than 8 characters" });
  }

  if (!/^[a-zA-Z0-9-_.+]+$/.test(username)) {
    return res
      .status(400)
      .json({ message: "Your username can't have any special characters" });
  }

  if (!username) {
    return res.status(400).json({ message: "Your username cannot be empty" });
  }

  User.findOne({ username }).then(found => {
    if (found) {
      return res
        .status(400)
        .json({ message: "This username is already taken" });
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    return User.create({ username, password: hashPass, fullName })
      .then(dbUser => {
        req.login(dbUser, err => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error while attempting to login" });
          }
          console.log("User created");
          res.json(dbUser);
        });
      })
      .catch(err => {
        res.json(err);
      });
  });
});

router.delete("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Successful logout" });
});

router.get("/loggedin", (req, res) => {
  res.json(req.user);
});

module.exports = router;
