const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  pic_name: { type: String, required: true },
  char_name: { type: String, required: true },
  max_x: { type: Number, required: true },
  min_x: { type: Number, required: true },
  max_y: { type: Number, required: true },
  min_y: { type: Number, required: true },
});



// Export model
module.exports = mongoose.model("Game", GameSchema);