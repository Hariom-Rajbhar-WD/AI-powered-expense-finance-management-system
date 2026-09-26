 import express from "express";

import {
  askAI
} from "../controllers/aiController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/ask", askAI);

export default router;