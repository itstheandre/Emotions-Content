const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contentSchema = new Schema({
  name:String,
  contentType: {
    type:String,
    enum: ["text", "audio", "image", "video"]
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  views: Number,
  date: String,
  url:String,
  title:String,
  body:String,
});

const Content = model("Content", contentSchema);
module.exports = Content;

/* 
Likes?
Comments
*/
