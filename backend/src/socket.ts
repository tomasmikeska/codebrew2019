import socketIo, { Socket, Server as SocketServer } from 'socket.io';
import { Server } from 'http';

const nlpAdapter = require('./nlp/watson-adapter');

export default function setSocket(server: Server): SocketServer {
  const socketio: SocketServer = socketIo(server);

  socketio.on('connection', (socket: Socket) => {
    console.log('Connected GUI');
    socket.emit('connectSuccess');

    socket.on('message', async (message) => {
      console.log(`Received message with content: ${message.content}`);
      const response = await nlpAdapter.getMessage(message.content);
      const messages = response.output.text.map((message: String) => {
        return {
          content: message
        };
      });
      setTimeout(() => {
        socket.emit('assistant', {
          messages
        });
      }, 3000);
    });

    socket.on('new-person', (person) => {
      console.log(`User ${person.firstName} ${person.surname} is here!`);
      setTimeout(() => {
        socket.emit('assistant', {
          messages: [
            { content: `Hello ${person.firstName} ${person.surname}!` }
          ] 
        });
      }, 2000);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected GUI');
    });
  });

  return socketio;
}
