import app from './app';
import { createServer, Server } from 'http';
import setSocket from './socket';


async function lol() {
  const nlpAdapter = require('./nlp/watson-adapter');

  let result = await nlpAdapter.getMessageWithContext('who', {user: 'Teri Cmuk'});
  // result = await nlpAdapter.getMessageWithContext('green', result.context);

  // await nlpAdapter.getMessageWithContext('reserve meeting room biege', {});
  //await nlpAdapter.getMessage('green');
}

lol();

const server: Server = createServer(app);
setSocket(server);

const port = 3333;
server.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
