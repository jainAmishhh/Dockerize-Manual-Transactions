import express from "express";
import {
  createTransaction,
  getTransactions,
  filterTransactions,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Apply auth to all transaction routes
router.use(authMiddleware);

// Create a new transaction
router.post("/", createTransaction);

// Get all transactions of logged-in user
router.get("/", getTransactions);

// Filter transactions (search, type, category, range)
router.get("/filter", filterTransactions);

// Update a transaction
router.put("/:id", updateTransaction);

// Delete a transaction
router.delete("/:id", deleteTransaction);

export default router;