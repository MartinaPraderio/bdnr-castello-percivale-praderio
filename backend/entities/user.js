const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "User email is required"],
    unique: [true, "The email must be unique"],
    match: [/.+\@.+\..+/, "Invalid email"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    match: [
      /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/,
      "Password must contain at least 6 characters with at least one letter and one number",
    ],
  },
  profileImage: { type: String },
  bio: { type: String },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  library: [{ type: Schema.Types.ObjectId, ref: 'Game' }],

  userToken: {
    type: String,
    unique: true,
    sparse: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };