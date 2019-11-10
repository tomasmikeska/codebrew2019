import socketIo from 'socket.io-client';

function setSocketWithBackend(url, store) {
  const socket = socketIo(url);

  socket.on('connectSuccess', () => {
    store.commit('SET_SOCKET', socket);
  });

  socket.on('assistant', (data) => {
    if (data.messages) {
      const voiceID = 1;
      const languageID = 1;
      const engineID = 4;

      data.messages.forEach(async message => {
        store.commit('ADD_MESSAGE', {
          ...message,
          isUser: false,
        });
        sayText(message.content, voiceID, languageID, engineID); // eslint-disable-line
      });
    }
  });
}


export default {
  setSocketWithBackend,
};
