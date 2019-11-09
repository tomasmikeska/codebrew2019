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

export default new Vuex.Store({
  state: {
    isSitePalLoaded: false,
    socket: null,
    messages: [],
    personId: null,
    eyesCenter: {
      x: 0,
      y: 0
    },
    botState: BOT_STATES.READY,
    faceNotPresentCounter: 0,
  },
  mutations: {
    SET_SOCKET(state, socket) {
      state.socket = socket;
    },
    ADD_MESSAGE(state, message) {
      state.messages.push(message);
    },
    DELETE_ALL_MESSAGES(state) {
      state.messages = [];
    },
    SET_PERSON_ID(state, personId) {
      state.personId = personId;
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
      dispatch('setFacePresent', faceRecognition.facePresent);
      commit('SET_EYES_CENTER', faceRecognition.landmarks.eyesCenter);
      commit('SET_PERSON_ID', faceRecognition.personId);
    },
    setFacePresent({ commit, state }, facePresent) {
      if (facePresent) {
        commit('RESET_FACE_NOT_PRESENT_COUNTER');
      } else {
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
    }
  },
  modules: {}
});
