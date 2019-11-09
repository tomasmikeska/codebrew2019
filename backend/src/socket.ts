import socketIo, { Socket, Server as SocketServer } from 'socket.io';
import { Server } from 'http';

export default function setSocket(server: Server): SocketServer {
  const socketio: SocketServer = socketIo(server);

  socketio.on('connection', (socket: Socket) => {
    console.log('Connected GUI');
    socket.emit('connectSuccess');

    let counter = 1;
    setInterval(() => {
      counter++;
      socket.emit('assistant', {
        message: {
          content: `Message ${counter}`,
        }
      });
    }, 5000);

    socket.on('disconnect', () => {
      console.log('Disconnected GUI');
    });
  });

  return socketio;
}
