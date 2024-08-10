const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());  // Enable CORS for all routes

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


const locationSchema = new mongoose.Schema({
  pickupLatitude: Number,
  pickupLongitude: Number,
  deliveryLatitude: Number,
  deliveryLongitude: Number,
});

const Location = mongoose.model('Location', locationSchema);

app.post('/api/save-location', async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).send('Location saved successfully!');
  } catch (error) {
    res.status(500).send('Error saving location:', error);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
