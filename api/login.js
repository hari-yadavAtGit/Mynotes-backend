import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }

});

export default router;
// This code defines an Express.js route for user login. It checks the provided email and password against the database, and if valid, generates a JWT token for the user. If the credentials are invalid or an error occurs, it responds with an appropriate error message. The token is sent back to the client for further authenticated requests.
