import express from 'express';
import CRUDController from './controllers/crud-controller';
import Person from './models/person';

const app = express();

app.use((req, res, next) => {
  res.contentType('application/vnd.api+json; charset=utf-8');
  next();
});


const PersonController = new CRUDController(Person);

app.use('/', PersonController.getRouter());

export default app;
