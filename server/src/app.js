import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

import authRoutes from "./routes/authUser.route.js";
import transactionRoutes from "./routes/transaction.route.js";

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

export { app };
