const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  vehicle_number: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  driver_name: { type: String },
  status: { type: String, enum: ['available', 'in transit', 'under maintenance'], default: 'available' }
});

module.exports = mongoose.model('Truck', truckSchema);
