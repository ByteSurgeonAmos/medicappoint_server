import express from "express";
import addEmailToUser from "../controllers/controller.js";

const router = express.Router();

router.post("", addEmailToUser);

export default router;
