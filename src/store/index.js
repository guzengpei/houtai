import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: false,
    token: {}
  },
  getters: {
  },
  mutations: {
    setIsCollapse (state, payload) {
      state.isCollapse = payload
    },
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
