const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contentSchema = new Schema({
  contentType: {
    enum: ["text", "audio", "image", "video"]
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  views: Number
});

const Content = model("Content", contentSchema);
module.exports = Content;

/* 
Likes?
Comments
*/
