import socketIo, { Socket, Server as SocketServer } from 'socket.io';
import { Server } from 'http';
import uuid from 'uuidv4';

const nlpAdapter = require('./nlp/watson-adapter');
const intentExtendActions = require('./intentExtendActions');

export default function setSocket(server: Server): SocketServer {
  const socketio: SocketServer = socketIo(server);

  socketio.on('connection', (socket: Socket) => {
    console.log('Connected GUI');
    socket.emit('connectSuccess');
    let context = {
    };

    let date = {
      day: 1,
      hours: 0,
    };

    let intentName = '';

    socket.on('message', async (message) => {
      console.log(`Received message with content: ${message.content}`);
      const response = await nlpAdapter.getMessageWithContext(message.content, context);
      context = response.context;

      if (!intentName.length && response.intents && response.intents.length) {
        intentName = response.intents[0].intent;
      }

      if (intentExtendActions.isCompletedIntent(response)) {
        //
        await intentExtendActions.processIntent(intentName, response, socket);
        intentName = '';
      }

      const messages = response.output.text.map((message: String) => {
        return {
          content: message
        };
      });

      if (messages.length) {
        socket.emit('assistant', {
          messages
        });
      }
    });

    socket.on('context', async (newDate) => {
      date = {...newDate};
      console.log('New date: ', date);
    });

    socket.on('new-person', async (person) => {
      intentName = '';
      context = {...date, conversation_id: uuid()};
      if (person) {
        console.log(`User ${person.firstName} ${person.surname} is here!`);
        // @ts-ignore
        context.user = `${person.firstName} ${person.surname}`;
      }

      const response = await nlpAdapter.getMessageWithContext('Hello', context);
      context = response.context;

      const messages = response.output.text.map((message: String) => {
        return {
          content: message
        };
      });
      socket.emit('assistant', {
        messages
      });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected GUI');
    });
  });

  return socketio;
}
