import express from "express";
import authRoutes from "./Routes/auth.js";
import recipesRoute from "./Routes/Recipes.js";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";

const port = process.env.Server_Port;
const app = express();

//db connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => {
    console.log("No connection", err.message);
  });

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipesRoute);

app.listen(port, () => console.log(`Server running on port: ${port}`));
