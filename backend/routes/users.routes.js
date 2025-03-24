import express from "express";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);

export default router;
