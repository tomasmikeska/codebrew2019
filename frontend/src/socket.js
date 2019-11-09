import socketIo from 'socket.io-client';

function setSocketWithBackend(url, store) {
  const socket = socketIo(url);

  socket.on('connectSuccess', () => {
    store.commit('SOCKET_CONNECT', socket);
  });

  socket.on('assistant', (data) => {
    if (data.sayText) {
      const voiceID = 1;
      const languageID = 1;
      const engineID = 4;

      sayText('kokotko', 1, 1, 4); // eslint-disable-line
    }
  });
}


export default {
  setSocketWithBackend,
};
