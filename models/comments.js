const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  text: { type: String, required: true, minLength: 1 },
  timestamp: { type: Date, default: new Date() },
  posts_id: { type: Schema.Types.ObjectId, ref: "Posts", required: true },
  
});


  

// Export model
module.exports = mongoose.model("Comments", CommentsSchema);