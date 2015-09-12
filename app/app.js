import express from 'express';
import bodyParser from 'body-parser';

import contentType from './middleware/content-type';
import CRUDController from './controllers/crud-controller';
import Person from './models/person';
import Store from './services/store';

const app = express();
const store = new Store(Person);
const PersonController = new CRUDController(Person, store);

app.use(bodyParser.json());
app.use(contentType);
app.use('/', PersonController.getRouter());

export default app;
export const _store = store;
