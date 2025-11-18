// routes/userRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");

const router = express.Router();

// 🟢 LOGIN endpoint
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0)
      return res.status(401).json({ error: "User not found" });
 
    const user = results[0];

    // Compare hashed password
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).json({ error: "Password check error" });

      if (!match)
        return res.status(401).json({ error: "Invalid password" });

      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    });
  });
});

module.exports = router;
