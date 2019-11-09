import app from './app';
import { createServer, Server } from 'http';
import setSocket from './socket';

const server: Server = createServer(app);
setSocket(server);

const port = 3333;
server.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
