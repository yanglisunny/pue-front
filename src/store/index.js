import { createStore } from 'vuex'
import state from "./state";
import actions from "./actions.js";
import getters from "./getters.js";
import mutations from "./mutations.js";
import createPersistedstate from 'vuex-persistedstate'

const store = createStore({
  state,
  mutations,
  getters,
  actions,
  modules: {
  },
  plugins: [createPersistedstate()]
});

export default store;
