const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();


app.use(bodyParser.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/warehouse-transportation", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
app.use(express.json());
app.use('/trucks', require('./routes/truckRoutes'));
app.use('/deliveries', require('./routes/deliveryRoutes'));
app.use('/items', require('./routes/itemRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
