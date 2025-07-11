import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", authRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 4567;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

/*
//signup route

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User alrady exists" });
    }
    const newUser = new User({
      name,
      email,
      password,
    }); // later hash the password
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 4567;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
*/
