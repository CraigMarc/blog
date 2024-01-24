const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HighScoreSchema = new Schema({
  userName: { type: String, required: true, minLength: 2 },
  score: { type: Number, required: true },
  pic_name: { type: String, required: true },
  
});



// Export model
module.exports = mongoose.model("HighScore", HighScoreSchema);