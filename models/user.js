const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true, minLength: 4 },
  password: { type: String, required: true, minLength: 6 },
  
  
});

// Virtual for item URL
UserSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/api/user/${this._id}`;
});

// Export model
module.exports = mongoose.model("User", UserSchema);