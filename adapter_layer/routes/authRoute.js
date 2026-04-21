import * as authController from "../controllers/authController.js";
import express from "express";

const authRoutes = express.Router();

router.post('/register', authController.registerUser);

export default authRoutes;