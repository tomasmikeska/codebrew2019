import socketIo, { Socket, Server as SocketServer } from 'socket.io';
import { Server } from 'http';

export default function setSocket(server: Server): SocketServer {
  const socketio: SocketServer = socketIo(server);

  socketio.on('connection', (socket: Socket) => {
    console.log('Connected GUI');
    socket.emit('connectSuccess');

    socket.on('message', (message) => {
      console.log(`Received message with content: ${message.content}`);
      setTimeout(() => {
        socket.emit('assistant', {
          message: {
            content: `Answer to message ${message.content}`
          }
        });
      }, 3000);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected GUI');
    });
  });

  return socketio;
}
