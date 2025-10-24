const Book = require('../models/book');
const jwt=require("jsonwebtoken")
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // ✅ JWT payload with your sample data
  const userData = {
    name: "Hema Marada",
    email: process.env.ADMIN_EMAIL,
    gender: "Female",
    age: 25,
  };

  const token = jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.json({ message: "Login successful", token});
};

module.exports = {
  loginUser
};