import express from 'express';
import CRUDController from './controllers/crud-controller';
import Person from './models/person';

const app = express();

const PersonController = new CRUDController(Person);

PersonController.addRoutes(app);

export default app;
