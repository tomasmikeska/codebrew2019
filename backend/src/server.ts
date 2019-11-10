import app from './app';
import { createServer, Server } from 'http';
import setSocket from './socket';
const sms = require('./integrations/sms');
const call = require('./integrations/call');

// sms.sendSms('+421918068460', 'kokot');
// call.callTaxi('+420774532168', `Hi, we would like to order taxi service from our office to ${'taxi_destination:'} at ${time}`);

async function lol() {
  const nlpAdapter = require('./nlp/watson-adapter');

  //let result = await nlpAdapter.getMessageWithContext('meeting room', {});
  //result = await nlpAdapter.getMessageWithContext('green', result.context);
  //result = await nlpAdapter.getMessageWithContext('cinema', result.context);

  // await nlpAdapter.getMessageWithContext('reserve meeting room biege', {});
  //await nlpAdapter.getMessage('green');
}

//lol();

const server: Server = createServer(app);
setSocket(server);

const port = 3333;
server.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
