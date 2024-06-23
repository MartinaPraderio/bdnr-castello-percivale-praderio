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
  badges: [{ type: String }],
  inventory: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  captures: [{ type: String }],
  videos: [{ type: String }],
  articles: [{ type: String }],
  reviews: [{ type: String }],
  guides: [{ type: String }],
  artwork: [{ type: String }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  library: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  privacySettings: {
    visibility: { type: String, enum: ['public', 'friends', 'private'], default: 'public' },
    showEmail: { type: Boolean, default: false },
    showProfileImage: { type: Boolean, default: true },
    showWishlist: { type: Boolean, default: true }
  },
  userToken: {
    type: String,
    unique: true,
    sparse: true,
  },
}, { strict: false });

const User = mongoose.model("User", userSchema);
module.exports = { User };