const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contentSchema = new Schema({
  name: String,
  contentType: {
    type: String,
    enum: ["audio", "image", "video"]
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  views: Number,
  date: String,
  urlPath: String,
  // videoUrl: String,
  // audioUrl: String,
  title: String,
  body: String,
  views: [{ type: Schema.Types.ObjectId, ref: "Views" }]
});

const Content = model("Content", contentSchema);
module.exports = Content;

/* 
Likes?
Comments
*/
