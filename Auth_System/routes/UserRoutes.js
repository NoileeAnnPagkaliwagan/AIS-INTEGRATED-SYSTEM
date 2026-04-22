import express from "express";
import * as UserController from '../controllers/UserController.js';

const userRoutes = express.Router();

// Routes for registration and login
userRoutes.post('/register', UserController.register);
userRoutes.post('/login', UserController.login);

export default userRoutes;