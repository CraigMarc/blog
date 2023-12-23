const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  name: { type: String, required: true, minLength: 1 },
  text: { type: String, required: true, minLength: 1 },
  timestamp: { type: Date, default: new Date() },
  posts_id: { type: Schema.Types.ObjectId, ref: "Posts", required: true },
  
});

// Virtual for Date
CommentsSchema.virtual("formattedDate").get(function () {
  // We don't use an arrow function as we'll need the this object
  return this.timestamp.toLocaleString();
});

  

// Export model
module.exports = mongoose.model("Comments", CommentsSchema);