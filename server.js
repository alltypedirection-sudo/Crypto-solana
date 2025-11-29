import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tokenRoutes from "./routes/tokenRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/token", tokenRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
