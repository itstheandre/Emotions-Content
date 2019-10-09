const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const viewsSchema = new Schema({
  averageEmotion: {
    angryAvg: Boolean,
    disgustedAvg: Boolean,
    fearfulAvg: Boolean,
    happyAvg: Boolean,
    neutralAvg: Number,
    sadAvg: Boolean,
    surprisedAvg: Boolean
  },
  maxEmotion: {
    angryMax: Number,
    disgustedMax: Number,
    fearfulMax: Number,
    happyMax: Number,
    neutralMax: Number,
    sadMax: Number,
    surprisedMax: Number
  },
  age: Number,
  time: [
    {
      fullTime: Array,
      min: Number,
      sec: Number
    }
  ],
  gender: String,
  contentId:
    { 
      type: Schema.Types.ObjectId, 
      ref: "Content" 
    }  
});

const Views = model("Views", viewsSchema);
module.exports = Views;

/* 
Likes?
Comments
*/
