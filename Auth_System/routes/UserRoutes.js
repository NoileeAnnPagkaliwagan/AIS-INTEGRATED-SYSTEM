<<<<<<< HEAD
import * as UserController from '../controllers/UserController.js';
import express from "express";



const userRoutes = express.Router();

userRoutes.post('/register', UserController.register);
userRoutes.post('/login', UserController.login);

export default userRoutes;
=======
import * as UserController from '../controller/UserController.js';
import express from "express";


const userRoutes = express.Router();

userRoutes.post('/register', UserController.register);
userRoutes.post('/login', UserController.login);

export default userRoutes;
>>>>>>> b37d8dedacfbc00b103b7e37239121725a2fc98a
