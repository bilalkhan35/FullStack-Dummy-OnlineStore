import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./confiq/db.js";
import itemRoute from "./routes/items.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
dotenv.config();

dbConnect();

app.use("/items", itemRoute);
const port = 8000;

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
