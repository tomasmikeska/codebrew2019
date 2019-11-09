import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSitePalLoaded: false,
    socket: null,
    messages: []
  },
  mutations: {
    SOCKET_CONNECT(state, socket) {
      state.socket = socket;
    },
    ADD_MESSAGE(state, message) {
      state.messages.push(message);
    }
  },
  actions: {},
  modules: {}
});
