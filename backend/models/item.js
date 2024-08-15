const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  item_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Item', itemSchema);
