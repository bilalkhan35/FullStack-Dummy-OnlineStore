import mongoose from "mongoose";
import { MONGODB_LOCAL_URI } from "./confiq.js";

const dbConnect = () => {
  mongoose
    .connect(MONGODB_LOCAL_URI)
    .then((conn) => console.log("DB is connected with " + conn.connection.host))
    .catch((err) => console.log("DB connection failed", err));
};

export default dbConnect;
