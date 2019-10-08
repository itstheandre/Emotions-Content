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
  imageUrl: String,
  title:String,
  body:String,
  averageEmotion: {
    angryAvg:Array,
    disgustedAvg:Array,
    fearfulAvg:Array,
    happyAvg:Array,
    neutralAvg:Array,
    sadAvg:Array,
    surprisedAvg:Array,
    },
  maxEmotion: {
    angryMax:Array,
    disgustedMax:Array,
    fearfulMax:Array,
    happyMax:Array,
    neutralMax:Array,
    sadMax:Array,
    surprisedMax:Array,
    

  },
  age:Array,
  time:[{
    fullTime:Array,
    min:Number,
    sec:Number,

  }],
  gender:Array,
  imagePath: {
    type: String,
    // default:
    //   "https://res.cloudinary.com/itstheandre/image/upload/v1568908103/my-dev-dash/xkg64abvucedo88zeej8.png"
  },
});

const Content = model("Content", contentSchema);
module.exports = Content;

/* 
Likes?
Comments
*/
