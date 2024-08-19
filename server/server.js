const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");

require("dotenv").config();

require('./utils/scheduler')

const adminRoutes = require("./routes/adminRoute");
const userRoutes = require("./routes/userRoute");
const robotRoutes = require("./routes/robotRoute");
const orderRoutes = require("./routes/orderRoute");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/robot", robotRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});