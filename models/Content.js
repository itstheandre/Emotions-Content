const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contentSchema = new Schema({
  name: String,
  contentType: {
    type: String,
    enum: ["text", "audio", "image", "video"]
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  views: Number,
  date: String,
  imagePath: String,
  title: String,
  body: String,
  views:[{type:Schema.Types.ObjectId, ref:"Views"}],
  imagePath: {
    type: String
    // default:
    //   "https://res.cloudinary.com/itstheandre/image/upload/v1568908103/my-dev-dash/xkg64abvucedo88zeej8.png"
  }
});

const Content = model("Content", contentSchema);
module.exports = Content;

/* 
Likes?
Comments
*/
