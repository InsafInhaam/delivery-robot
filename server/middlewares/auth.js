const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("No token provided");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // Use 'decoded' here
    if (err) return res.status(403).send("Failed to authenticate token");
    req.userId = decoded.id; // Access the 'decoded' token payload
    next();
  });
};

module.exports = authMiddleware;
