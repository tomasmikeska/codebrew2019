import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const BOT_STATES = {
  READY: {
    key: 'ready'
  },
  LISTENING: {
    key: 'listening'
  },
  WAITING: {
    key: 'waiting'
  },
  TALKING: {
    key: 'talking'
  }
};

const PERSONS = [
  {
    id: 'tomas_lysek',
    firstName: 'Tomas',
    surname: 'Lysek'
  },
  {
    id: 'jakub_kriz',
    firstName: 'Jakub',
    surname: 'Kriz'
  },
  {
    id: 'tomas_gabrs',
    firstName: 'Tomas',
    surname: 'Gabrs'
  },
  {
    id: 'lukas_krizan',
    firstName: 'Lukas',
    surname: 'Krizan'
  },
  {
    id: 'tomas_mikeska',
    firstName: 'Tomas',
    surname: 'Mikeska'
  },
  {
    id: 'tono_wiedermann',
    firstName: 'Tono',
    surname: 'Wiedermann'
  },
  {
    id: 'zdenek_hladik',
    firstName: 'Zdenek',
    surname: 'Hladik'
  }
];

export default new Vuex.Store({
  state: {
    isSitePalLoaded: false,
    socket: null,
    currentMessage: {
      isUser: true,
      content: ''
    },
    messages: [],
    person: null,
    eyesCenter: {
      x: 0,
      y: 0
    },
    botState: BOT_STATES.READY,
    faceNotPresentCounter: 0,
  },
  getters: {
    isListening: (state) => state.botState === BOT_STATES.LISTENING
  },
  mutations: {
    SET_SITEPAL_LOADED(state, isSitePalLoaded) {
      state.isSitePalLoaded = isSitePalLoaded;
    },
    SET_SOCKET(state, socket) {
      state.socket = socket;
    },
    SET_CURRENT_MESSAGE(state, message) {
      state.currentMessage = message;
    },
    ADD_MESSAGE(state, message) {
      state.messages.push(message);
    },
    DELETE_ALL_MESSAGES(state) {
      state.messages = [];
    },
    SET_PERSON(state, person) {
      state.person = person;
    },
    SET_EYES_CENTER(state, eyesCenter) {
      state.eyesCenter = eyesCenter;
    },
    SET_BOT_STATE(state, botState) {
      state.botState = botState;
    },
    INCREASE_FACE_NOT_PRESENT_COUNTER(state) {
      state.faceNotPresentCounter++;
    },
    RESET_FACE_NOT_PRESENT_COUNTER(state) {
      state.faceNotPresentCounter = 0;
    }
  },
  actions: {
    setFaceRecognitionData({ commit, dispatch, state }, faceRecognition) {
      commit('SET_FACE_PRESENT', faceRecognition.facePresent);
      const person = PERSONS.find(person => person.id === faceRecognition.personId);
      if (person !== state.person && state.botState === BOT_STATES.READY) {
        commit('SET_PERSON', person);
        if (faceRecognition.facePresent) {
          dispatch('sendNewPerson');
        }
      }
      if (faceRecognition.facePresent) {
        commit('RESET_FACE_NOT_PRESENT_COUNTER');
      } else if (state.botState === BOT_STATES.READY) {
        commit('INCREASE_FACE_NOT_PRESENT_COUNTER');
      }

      if (faceRecognition.facePresent && state.botState === BOT_STATES.READY) {
        commit('SET_BOT_STATE', BOT_STATES.LISTENING);
      }

      if (!faceRecognition.facePresent && state.botState === BOT_STATES.READY && state.faceNotPresentCounter >= 10) {
        commit('DELETE_ALL_MESSAGES');
      }

      commit('SET_EYES_CENTER', faceRecognition.landmarks.eyesCenter);
    },
    startTalking({ commit }) {
      commit('SET_BOT_STATE', BOT_STATES.TALKING);
    },
    stopTalking({ commit }) {
      commit('SET_BOT_STATE', BOT_STATES.READY);
    },
    stopWaitingAndBeReady({ commit }) {
      commit('SET_BOT_STATE', BOT_STATES.READY);
    },
    sendNewPerson({ commit, state }) {
      commit('DELETE_ALL_MESSAGES');
      commit('SET_BOT_STATE', BOT_STATES.WAITING);
      state.socket.emit('new-person', state.person);
    },
    setCurrentMessage({ commit }, message) {
      commit('SET_CURRENT_MESSAGE', {
        isUser: true,
        content: message
      });
    },
    sendMessage({ commit, state }, message) {
      commit('SET_CURRENT_MESSAGE', {
        isUser: true,
        content: ''
      });
      if (message) {
        commit('ADD_MESSAGE', {
          content: message,
          isUser: true
        });
        commit('SET_BOT_STATE', BOT_STATES.WAITING);
        state.socket.emit('message', {
          content: message
        });
      } else {
        commit('SET_BOT_STATE', BOT_STATES.READY);
      }
    },

    sendContext({ commit, state }, context) {
      state.socket.emit('context', context);
    }
  },
  modules: {}
});
