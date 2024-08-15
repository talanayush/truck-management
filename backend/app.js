const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();

const mongoURI = "mongodb+srv://ayushtalan07:kbdtExpgKuCAGtZz@cluster0.88nba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));


app.use(bodyParser.json());
app.use(cors());
// mongoose.connect("mongodb+srv://ayushtalan07:<ayush12345>@cluster0.l6edb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const db = mongoose.connection;



// db.on('error', (error) => console.error('MongoDB connection error:', error));
// db.once('open', () => console.log('Connected to MongoDB'));

// Routes
app.use(express.json());
app.use('/trucks', require('./routes/truckRoutes'));
app.use('/deliveries', require('./routes/deliveryRoutes'));
app.use('/items', require('./routes/itemRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
