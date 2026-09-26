 import express from "express";

import {
  createExpense,
  getExpenses,
  deleteExpense
} from "../controllers/expenseController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getExpenses);

router.post("/", createExpense);

router.delete("/:id", deleteExpense);

export default router;