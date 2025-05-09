import express from "express";
import "dotenv/config";

import { connectDB } from "./config/db";
import router from "./routes";

connectDB();

const app = express();

app.use(express.json());

app.use("/api", router);

export default app;
