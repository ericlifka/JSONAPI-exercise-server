import express from 'express';
import contentType from './middleware/content-type';
import CRUDController from './controllers/crud-controller';
import Person from './models/person';
import Store from './services/store';

const app = express();
const store = new Store();
const PersonController = new CRUDController(Person, store);

app.use(contentType);
app.use('/', PersonController.getRouter());

export default app;
export const _store = store;
