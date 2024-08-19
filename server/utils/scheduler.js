const cron = require("node-cron");
const {
  assignRobotsToWaitingOrders,
} = require("../controllers/orderController");

cron.schedule("*/5 * * * *", async () => {
  try {
    await assignRobotsToWaitingOrders();
    console.log("Checked and assigned robots to waiting orders");
  } catch (error) {
    console.error("Error running scheduled task:", error.message);
  }
});

