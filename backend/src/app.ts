import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.get('/', async (req, res) => {
  res.send('Hello World!');
});

export default app;
