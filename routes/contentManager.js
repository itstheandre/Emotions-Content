const express = require("express");
const router = express.Router();
const Content = require("../models/Content");
const User = require("../models/User");

// Get all documents you wrote
router.get("/", (req, res) => {
  Content.find({ owner: req.user._id })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// Get specific docuemnt. Nobody cares if you wrote it
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  Content.findById(req.params.id)
    .populate("owner")
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

// Create content
router.post("/add", (req, res) => {
  const { url, title, contentType, body } = req.body;
  const owner = req.user;
  const date = new Date()
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, "/");
  User.findById(req.user._id).then(found => {
    Content.create({ url, title, date, contentType, owner, body }).then(
      response => {
        console.log("response here: ", response);
        res.json(response);
      }
    );
  });
});

// Delete Content
router.delete("/:id/:banana", (req, res) => {
  const contentId = req.params.id;

  Content.findById(contentId)
    .then(proyect => {
      console.log(proyect.owner);
      if (
        req.user &&
        JSON.stringify(proyect.owner) === JSON.stringify(req.user._id)
      ) {
        console.log("hello");
        Content.findByIdAndDelete(contentId)
          .then(response => {
            res.json({ message: "ok" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        res.json({ message: "not ok bro not okay" });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.put("/:id", (req, res) => {
  const { url, title, contentType, body } = req.body;
  Content.findById(req.params.id).then(project => {
    if (
      req.user &&
      JSON.stringify(project.owner) === JSON.stringify(req.user._id)
    ) {
      console.log("hello");
      Content.findByIdAndUpdate(
        req.params.id,
        { url, title, body },
        { new: true }
      )
        .then(response => {
          res.json(response);
        })
        .catch(err => {
          res.json(err);
        });
    } else {
      res.json({ message: "not ok bro not okay" });
    }
  });
});

module.exports = router;
