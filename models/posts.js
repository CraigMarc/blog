const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostsSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 100 },
  text: { type: String, required: true, minLength: 1 },
  timestamp: { type: Date, default: new Date() },
  published: { type: Boolean },
  
});

// Virtual for item URL
PostsSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/api/posts/${this._id}`;
});

// Virtual for Date
PostsSchema.virtual("formattedDate").get(function () {
    // We don't use an arrow function as we'll need the this object
    return this.timeStamp.toLocaleString();
  });

// Export model
module.exports = mongoose.model("Posts", PostsSchema);