const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostsSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 100 },
  text: { type: String, required: true, minLength: 1 },
  timestamp: { type: Date, default: new Date() },
  published: { type: Boolean },
  image: { type: String }, 
});




// Export model
module.exports = mongoose.model("Posts", PostsSchema);