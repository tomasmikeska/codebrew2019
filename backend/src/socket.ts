import socketIo, { Socket, Server as SocketServer } from 'socket.io';
import { Server } from 'http';

const nlpAdapter = require('./nlp/watson-adapter');

export default function setSocket(server: Server): SocketServer {
  const socketio: SocketServer = socketIo(server);

  socketio.on('connection', (socket: Socket) => {
    console.log('Connected GUI');
    socket.emit('connectSuccess');
    let context = {
    };

    socket.on('message', async (message) => {
      console.log(`Received message with content: ${message.content}`);
      const response = await nlpAdapter.getMessageWithContext(message.content, context);
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

    socket.on('new-person', async (person) => {
      console.log(`User ${person.firstName} ${person.surname} is here!`);
      // @ts-ignore
      context.user = `${person.firstName} ${person.surname}`;
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
