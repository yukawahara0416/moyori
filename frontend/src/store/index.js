import Vue from 'vue'
import Vuex from 'vuex'
import markerStore from '@/store/modules/marker.js'
import userStore from '@/store/modules/user.js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    markerStore,
    userStore
  },

  plugins: [
    createPersistedState({
      paths: ['userStore.currentUser', 'userStore.headers'],
      storage: window.sessionStorage
    })
  ],

  state: {},
  getters: {},
  mutations: {},
  actions: {}
})
