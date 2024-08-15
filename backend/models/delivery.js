const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  delivery_id: { type: String, required: true, unique: true },
  pin: { type: String, required: true },
  truck_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
  status: { type: String, enum: ['in progress', 'completed', 'cancelled'], default: 'in progress' },
  items: [{
    item_id: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
  }],
  source: { type: String },  // Add this line
  destination: { type: String },  // Add this line
  delivery_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Delivery', deliverySchema);
