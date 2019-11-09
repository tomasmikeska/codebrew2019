import socketIo from 'socket.io-client';

function setSocketWithBackend(url, store) {
  const socket = socketIo(url);

  socket.on('connectSuccess', () => {
    store.commit('SOCKET_CONNECT', socket);
  });

  socket.on('assistant', (data) => {
    if (data.message) {
      store.commit('ADD_MESSAGE', {
        ...data.message,
        isUser: false,
      });

      const voiceID = 1;
      const languageID = 1;
      const engineID = 4;

      sayText(data.message.content, voiceID, languageID, engineID); // eslint-disable-line
    }
  });
}


export default {
  setSocketWithBackend,
};
