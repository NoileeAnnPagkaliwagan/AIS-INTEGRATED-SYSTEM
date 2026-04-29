import * as ProfileController from '../controllers/profileController.js';
import express from 'express';

const profileRoute = express.Router();

profileRoute.get('/', ProfileController.listAll);
profileRoute.get('/:id', ProfileController.getProfile);
profileRoute.post('/', ProfileController.create);

export default profileRoute;