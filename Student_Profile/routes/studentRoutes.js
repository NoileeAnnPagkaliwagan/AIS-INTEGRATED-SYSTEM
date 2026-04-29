import * as StudentControllers from '../controllers/studentControllers.js';
import express from 'express';

const studentRoutes = express.Router();


studentRoutes.get('/:id', StudentControllers.getProfile);

studentRoutes.get('/', StudentControllers.listAllProfiles);

studentRoutes.post('/new', StudentControllers.createProfile);

export default studentRoutes;