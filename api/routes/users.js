import express from "express";
import { deleteUser, updateUser } from "../controllers/user.js";

const router = express.Router();

router.delete("/:id", deleteUser);
router.put("/:id",updateUser);
export default router;