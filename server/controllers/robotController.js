const Robot = require("../models/robotModel");

exports.createRobot = async (req, res) => {
  const { name, status, lastKnownCoordinates, modelNumber, firmwareVersion } =
    req.body;

  if (!name || !status) {
    return res.status(400).send("Name or status is missing");
  }

  if (lastKnownCoordinates) {
    const { latitude, longitude } = lastKnownCoordinates;
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return res.status(500).send("Invalid coordinate format");
    }
  }

  // Generate a unique 12-digit serial number with 'S/N-' prefix
  const serialNumber = `S/N-${Math.floor(
    100000000000 + Math.random() * 900000000000
  )}`;

  try {
    const robot = new Robot({
      name,
      status,
      lastKnownCoordinates,
      modelNumber,
      serialNumber,
      firmwareVersion,
    });

    await robot.save();
    res.status(201).send("Robot created successfully");
  } catch (error) {
    res.status(500).send("Error in creating robot: " + error.message);
  }
};

exports.viewRobot = async (req, res) => {
  try {
    const robots = await Robot.find();
    res.json(robots);
  } catch (error) {
    res.status(500).send("Error fetching robots:" + error.message);
  }
};

exports.deleteRobot = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRobot = await Robot.findByIdAndDelete(id);
    if (!deleteRobot) {
      return res.status(404).send("Robot Not Found");
    }
  } catch (error) {
    res.status(500).send("Error deleting robots:", error);
  }
};

// Endpoint to get the lid status for a specific robot
exports.getLidStatus = async (req, res) => {
  try {
    const robotId = req.query.robotId;

    if (!robotId) {
      return res.status(400).send("robotId is required");
    }

    const robot = await Robot.findById(robotId);

    if (!robot) {
      return res.status(404).send("Robot not found");
    }

    res.send(robot.lidStatus);
  } catch (error) {
    res.status(500).send("Error fetching lid status: " + error.message);
  }
};

// Endpoint to update the lid status
exports.updateLid = async (req, res) => {
  try {
    const robotId = req.query.robotId;
    const action = req.query.action; // Expected "open" or "close"

    if (!robotId || !action) {
      return res.status(400).send("robotId and action are required");
    }

    if (action !== "open" && action !== "close") {
      return res.status(400).send('Invalid action. Use "open" or "close".');
    }

    const robot = await Robot.findById(robotId);

    if (!robot) {
      return res.status(404).send("Robot not found");
    }

    robot.lidStatus = action;
    await robot.save();

    res.send(`Lid status for robot ${robotId} updated to ${action}`);
  } catch (error) {
    res.status(500).send("Error updating lid status: " + error.message);
  }
};
