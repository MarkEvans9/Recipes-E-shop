import mongoose from "mongoose";
import "dotenv/config";

try {
  const connection = mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected!"));
} catch (error) {
  console.log(error.message || "connection to database failed");
}

console.log(process.env.MONGO_URL);
