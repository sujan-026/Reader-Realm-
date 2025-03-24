import express from "express";
import {
  createReview,
  deleteReview,
  getReview,
  updateReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", getReview);
router.post("/", createReview);
router.delete("/:id", deleteReview);
router.put("/:id", updateReview);

export default router;
