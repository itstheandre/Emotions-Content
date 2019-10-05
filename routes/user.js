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

module.exports = router;
