 import express from "express";

import {
  createBudget,
  getBudgets,
  deleteBudget
} from "../controllers/budgetController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getBudgets);

router.post("/", createBudget);

router.delete("/:id", deleteBudget);

export default router;