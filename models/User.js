const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    socialId: String,
    profilePicUrl: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = model("User", userSchema);
module.exports = User;

/* 
Content connection?
Following?
Followers?
Comments?
*/
