import Vue from 'vue'
import Vuex from 'vuex'
import userStore from '@/store/modules/user.js'
import spotStore from '@/store/modules/spot.js'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userStore,
    spotStore
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
