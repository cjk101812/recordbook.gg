import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    darkMode: true,
    loggedInUserId: ""
  },
  plugins: [createPersistedState()],
  mutations: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setLoggedInUser(state, payload) {
      console.log(payload);
      state.loggedInUserId = payload.userId;
    },
    logoutUser(state) {
      state.loggedInUserId = "";
    },
  },
});
