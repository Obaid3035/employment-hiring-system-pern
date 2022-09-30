import express from 'express';
import cors from 'cors';

import handleErrors from './app/middleware/handleError';
import router from './config/routes';

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());
app.use(router);

app.use(handleErrors);

export default app;
