const express = require("express");
const {
  saveOrder,
  allOrders,
  deleteOrders,
  assignRobot,
  ViewOrders,
  coordinates,
} = require("../controllers/orderController");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

// Save Order
router.post("/save-order", authMiddleware, saveOrder);

// Get All Orders
router.get("/orders", authMiddleware, allOrders);

// Get All Orders
router.get("/all-orders", authMiddleware, ViewOrders);

// Delete an Order
router.delete("/orders/:id", authMiddleware, deleteOrders);

// Assign Robot for order
router.post("/assign-order", assignRobot)

// Assign Robot for order
router.get("/coordinates", coordinates)

module.exports = router;

