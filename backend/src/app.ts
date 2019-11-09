import express, { Express } from 'express';
import bodyParser from 'body-parser';

const app: Express = express();
app.use(bodyParser.json());
app.get('/', async (req, res) => {
  res.send('Hello World!');
});

export default app;
