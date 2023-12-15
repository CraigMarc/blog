const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  text: { type: String, required: true, minLength: 1 },
  timestamp: { type: Date },
  posts_id: { type: Schema.Types.ObjectId, ref: "Posts", required: true },
  
});

// Virtual for item URL
CommentsSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/api/comments/${this._id}`;
});

// Virtual for Date
CommentsSchema.virtual("formattedDate").get(function () {
    // We don't use an arrow function as we'll need the this object
    return this.timeStamp.toLocaleString();
  });

// Export model
module.exports = mongoose.model("Comments", CommentsSchema);