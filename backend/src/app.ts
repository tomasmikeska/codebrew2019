import express, { Express } from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/azure', async (req, res) => {
  res.send(process.env.AZURE_TOKEN);
});

export default app;
