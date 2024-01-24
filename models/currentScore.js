const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CurrentScoreSchema = new Schema({
  user_id: { type: String, required: true, minLength: 2 },
  start_time: { type: Number, required: true },
  score: { type: Number },
  
});



// Export model
module.exports = mongoose.model("CurrentScore", CurrentScoreSchema);