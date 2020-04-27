const express = require("express");
const router = express.Router();
const Content = require("../models/Content");
const User = require("../models/User");
const uploader = require("../config/cloudinary");
const uploadAudio = require("../config/cloudinary-audio");

// Get all documents you created
router.get("/", (req, res) => {
  Content.find({ owner: req.user._id })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

// Get specific document. Nobody cares if you created it
router.get("/:id", (req, res) => {
  // console.log(req.params.id);
  Content.findById(req.params.id)
    .populate("owner")
    .populate("views")
    .then(response => {
      // console.log(response);
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});
// router to create an image
router.post("/add/image", uploader.single("urlPath"), (req, res, next) => {
  // console.log('file is: ', req.file)
  // <console className="l">se </console>og(req.file);
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get secure_url from the file object and save it in the
  // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
  res.json({ secure_url: req.file.secure_url });
});

router.post(
  "/add/audio",
  uploadAudio.single("urlPath", { resource_type: "video" }),
  (req, res, next) => {
    console.log("audio axios", req.file);
    if (!req.file) {
      next(new Error("No file uploaded"));
      return;
    }
    console.log(req.file);
    res.json({ secure_url: req.file.secure_url });
  }
);

const displayError = async (err, req, res, next) => {
  res.status(err.status || 500);
};

const catchErrors = fn => {
  console.log("inside the catch errors func");
  return function(req, res, next) {
    return fn(req, res).catch(next);
  };
};

async function addContent(req, res, next) {
  const { url, title, contentType, body, urlPath } = req.body;

  const owner = req.user;
  const date = new Date()
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, "/");
  try {
    const created = await Content.create({
      url,
      title,
      date,
      contentType,
      owner,
      body,
      urlPath
    });

    res.json(created);
  } catch (error) {
    next();
  }
}

router.post("/add", displayError, catchErrors(addContent));
// // Create content
// router.post("/add", (req, res) => {
//   // , uploadCloud.single("imagePath")

//   const { url, title, contentType, body, urlPath } = req.body;

//   const owner = req.user;
//   const date = new Date()
//     .toJSON()
//     .slice(0, 10)
//     .replace(/-/g, "/");

//   User.findById(req.user._id).then(found => {
//     Content.create({
//       url,
//       title,
//       date,
//       contentType,
//       owner,
//       body,
//       urlPath
//     }).then(response => {
//       console.log("response here: ", response);
//       console.log("aaaaaaaa", response);
//       res.json(response);
//     });
//   });
// });

// Delete Content
router.delete("/:id", (req, res) => {
  const contentId = req.params.id;

  Content.findById(contentId)
    .then(proyect => {
      // console.log(proyect.owner);
      if (
        req.user &&
        JSON.stringify(proyect.owner) === JSON.stringify(req.user._id)
      ) {
        // console.log("hello");
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

//Update content
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
