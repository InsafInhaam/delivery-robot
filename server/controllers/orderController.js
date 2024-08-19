const Order = require("../models/orderModel");
const Robot = require("../models/robotModel");

// Place an order
exports.saveOrder = async (req, res) => {
  try {
    // Find an available and active robot
    const robot = await Robot.findOne({ status: "active", availability: true });

    // Create a new order
    const order = new Order({
      ...req.body,
      userId: req.userId,
      assignedRobot: robot ? robot._id : null,
      status: robot ? "picking up" : "waiting for robot", // Set initial status
    });
    await order.save();

    if (robot) {
      // Update the robot status to 'assigned' and availability to false
      robot.status = "assigned";
      robot.availability = false;
      await robot.save();
    }

    res.status(201).send("Order saved and robot assigned successfully!");
  } catch (error) {
    res.status(500).send("Error saving order: " + error.message);
  }
};

// Function to assign robots to waiting orders
exports.assignRobotsToWaitingOrders = async () => {
  try {
    // Find the first available and active robot
    const robot = await Robot.findOne({ status: "active", availability: true });

    if (!robot) {
      console.log("No available robots at the moment.");
      return;
    }

    // Find the first waiting order
    const order = await Order.findOne({ status: "waiting for robot" });

    if (!order) {
      console.log("No waiting orders found.");
      return;
    }

    // Assign the robot to the order
    order.assignedRobot = robot._id;
    order.status = "picking up";
    await order.save();

    // Update the robot status to 'assigned' and availability to false
    robot.status = "assigned";
    robot.availability = false;
    await robot.save();

    console.log(`Order ${order._id} assigned to robot ${robot._id}`);
  } catch (error) {
    console.error("Error assigning robots to waiting orders: " + error.message);
  }
};



// Get All Orders
exports.allOrders = async (req, res) => {
  // console.log(req.userId);
  try {
    const orders = await Order.find({ userId: req.userId });
    res.json(orders);
  } catch (error) {
    res.status(500).send("Error fetching orders: " + error.message);
  }
};

// view all orders
exports.ViewOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).send("Error fetching orders: " + error.message);
  }
};

// Delete a Order
exports.deleteOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).send("Order not found");
    }
    res.status(200).send("Order deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting order:", error);
  }
};

// assign robot to order
exports.assignRobot = async (req, res) => {
  const { orderId, robotId } = req.body;

  try {
    const order = await Order.findById(orderId);
    const robot = await Robot.findById(robotId);

    if (order && robot) {
      order.assignedRobot = robotId;
      robot.status = "assigned";
      await order.save();
      await robot.save();
      res.json({ message: "Order assigned successfully" });
    } else {
      res.status(404).json({ message: "Order or Robot not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get robot coordinates
exports.coordinates = async (req, res) => {
  const { robotId } = req.query;
  console.log(robotId);

  try {
    const robot = await Robot.findById(robotId);
    if (robot) {
      // Find the most recent pending order assigned to this robot
      const pendingOrder = await Order.findOne({
        assignedRobot: robotId,
        status: "pending",
      }).sort({ _id: -1 });

      if (pendingOrder) {
        // Retrieve the most recent location entry for this robot
        const location = robot.lastKnownCoordinates;

        res.json({
          orderId: pendingOrder._id,
          orderStatus: pendingOrder.status,
          pickupLatitude: pendingOrder.pickupLatitude,
          pickupLongitude: pendingOrder.pickupLongitude,
          deliveryLatitude: pendingOrder.deliveryLatitude,
          deliveryLongitude: pendingOrder.deliveryLongitude,
          currentLatitude: location.latitude,
          currentLongitude: location.longitude,
        });
      } else {
        res
          .status(404)
          .json({ message: "No pending orders assigned to this robot" });
      }
    } else {
      res.status(404).json({ message: "Robot not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



