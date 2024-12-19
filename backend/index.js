import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./src/lib/db.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use("/api/auth", authRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port} 🚀`);
  connectDB();
});
