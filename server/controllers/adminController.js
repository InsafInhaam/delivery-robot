const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

exports.Adminlogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status("Error in login, email or password missing");
  }

  try {
    const admin = new Admin.findOne({ email });

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).send("Error in login admin:" + error.message);
  }
};

exports.createAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status("Error in creating account, email or password missing");
  }

  try {
    const admin = new Admin({ email, password });
    await admin.save();
    res.status(201).send("Admin Created successfully");
  } catch (error) {
    res.status(500).send("Error in creating admin:" + error.message);
  }
};
