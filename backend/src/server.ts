import express from "express";
import "dotenv/config";

import { connectDB } from "./config/db";
import router from "./routes";
import { errorHandler } from "./middleware/error-handler";

connectDB();

const app = express();

app.use(express.json());

app.use("/api", router);
app.use(errorHandler);

export default app;
