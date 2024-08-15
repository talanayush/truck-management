const express = require('express');
const router = express.Router();
const Truck = require('../models/truck');

// Get all trucks
router.get('/', async (req, res) => {
  try {
    const trucks = await Truck.find();
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a truck by vehicle_number
router.get('/:vehicle_number', async (req, res) => {
  try {
    const truck = await Truck.findOne({ vehicle_number: req.params.vehicle_number });
    if (!truck) return res.status(404).json({ message: 'Truck not found' });
    res.json(truck);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new truck
router.post('/', async (req, res) => {
  const truck = new Truck(req.body);
  try {
    const newTruck = await truck.save();
    res.status(201).json(newTruck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a truck
router.put('/:vehicle_number', async (req, res) => {
  try {
    const updatedTruck = await Truck.findOneAndUpdate(
      { vehicle_number: req.params.vehicle_number },
      req.body,
      { new: true }
    );
    if (!updatedTruck) return res.status(404).json({ message: 'Truck not found' });
    res.json(updatedTruck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a truck
router.delete('/:vehicle_number', async (req, res) => {
  try {
    const result = await Truck.findOneAndDelete({ vehicle_number: req.params.vehicle_number });
    if (!result) return res.status(404).json({ message: 'Truck not found' });
    res.json({ message: 'Truck deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
