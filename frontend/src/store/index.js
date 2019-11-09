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
    id: '1',
    firstName: 'Tomas',
    surname: 'Lysek'
  },
  {
    id: '2',
    firstName: 'Jakub',
    surname: 'Kriz'
  },
  {
    id: '3',
    firstName: 'Boris',
    surname: 'Kosina'
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
    setFaceRecognitionData({ commit, dispatch }, faceRecognition) {
      dispatch('setPersonById', faceRecognition.personId);
      dispatch('setFacePresent', faceRecognition.facePresent);
      commit('SET_EYES_CENTER', faceRecognition.landmarks.eyesCenter);
    },
    setPersonById({ commit, dispatch, state }, personId) {
      const person = PERSONS.find(person => person.id === personId);
      if (person !== state.person && state.botState === BOT_STATES.READY) {
        commit('SET_PERSON', person);
        dispatch('sendNewPerson');
      }
    },
    setFacePresent({ commit, state }, facePresent) {
      if (facePresent) {
        commit('RESET_FACE_NOT_PRESENT_COUNTER');
      } else if (state.botState === BOT_STATES.READY) {
        commit('INCREASE_FACE_NOT_PRESENT_COUNTER');
      }

      if (facePresent && state.botState === BOT_STATES.READY) {
        commit('SET_BOT_STATE', BOT_STATES.LISTENING);
      }

      if (!facePresent && state.faceNotPresentCounter >= 10) {
        commit('DELETE_ALL_MESSAGES');
      }
    },
    startTalking({ commit }) {
      commit('SET_BOT_STATE', BOT_STATES.TALKING);
    },
    stopTalking({ commit }) {
      commit('SET_BOT_STATE', BOT_STATES.READY);
    },
    sendNewPerson({ commit, state }) {
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
      commit('ADD_MESSAGE', {
        content: message,
        isUser: true
      });
      commit('SET_BOT_STATE', BOT_STATES.WAITING);
      state.socket.emit('message', {
        content: message
      });
    }
  },
  modules: {}
});
