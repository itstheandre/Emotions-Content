const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary-profile");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const catchErrors = fn => {
  console.log("inside the catch errors func");
  return function(...params) {
    console.log(params);
    return fn(...params).catch(err => err.message);
  };
};

async function user(req, res, next) {
  console.log("hello");
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
}

router.get("/:id", catchErrors(user));

// router.get("/:id", (req, res, next) => {
//   console.log(req.params.id);
//   const { id } = req.params;
//   User.findById(id).then(response => {
//     res.json(response);
//   });
// });

router.post(
  "/add/image",
  uploadCloud.single("profilePicture"),
  (req, res, next) => {
    console.log(req.file);
    // console.log('file is: ', req.file)
    // <console className="l">se </console>og(req.file);
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    // get secure_url from the file object and save it in the
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    res.json({ secure_url: req.file.secure_url });
  }
);

router.put("/:id", (req, res) => {
  // const { user } = req.body;
  const {
    fullName,
    username,
    newPasswordTest,
    // profilePicture,
    oldPasswordTest
  } = req.body;
  console.log(req.body);

  User.findById(req.params.id).then(dbUser => {
    User.findOne({ username }).then(found => {
      if (found && username !== dbUser.username) {
        return res
          .status(400)
          .json({ message: "This username is already taken" });
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const newHashPass = bcrypt.hashSync(newPasswordTest, salt);

      if (!bcrypt.compareSync(oldPasswordTest, dbUser.password)) {
        return res
          .status(400)
          .json({ message: "Please fill with the correct password" });
      } else if (newHashPass === dbUser.password) {
        return res
          .status(400)
          .json({ message: "You're using the same password as before" });
      }

      if (newPasswordTest.length < 8) {
        return res.status(400).json({
          message: "Please make sure your password has 8 characters, at least"
        });
      }

      let password;
      // if (!oldPasswordTest %) {
      //   password = newHashPass;
      // }
      if (!oldPasswordTest || !newPasswordTest) {
        password = dbUser.password;
      } else {
        password = newHashPass;
      }

      // const password = newPasswordTest ? newHashPass : dbUser.password;
      // const profilePicture = profilePicture
      //   ? profilePicture
      //   : dbUser.profilePicture;
      User.findByIdAndUpdate(
        req.params.id,
        { username, fullName, password },
        // { username, fullName, profilePicture, password },
        { new: true }
      )
        .then(response => {
          console.log(response);
          res.json({ message: "Profile successfully updated" });
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
});

module.exports = router;
