const mongoose = require("mongoose");

const robotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, default: "idle" },
  lastKnownCoordinates: {
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
  },
  modelNumber: { type: String, required: true }, // Model number of the robot
  serialNumber: { type: String, required: true, unique: true }, // Serial number with unique constraint
  firmwareVersion: { type: String, required: false }, // Firmware version of the robot
  availability: { type: Boolean, default: true }, // Track robot availability
  lidStatus: { type: String, enum: ['open', 'close'], default: 'close' } // Add lidStatus field
});

module.exports = mongoose.model('Robot', robotSchema);

