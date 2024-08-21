const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  pickupLatitude: Number,
  pickupLongitude: Number,
  deliveryLatitude: Number,
  deliveryLongitude: Number,
  productName: String,
  productDescription: String,
  weightKg: Number,
  category: String,
  assignedRobot: { type: mongoose.Schema.Types.ObjectId, ref: "Robot" },
  status: {
    type: String,
    enum: [
      "waiting for assign robot",
      "picking up",
      "delivering",
      "complete",
      "pending",
      "failed",
      "canceled",
    ],
    default: "pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);
