import Vue from 'vue'
import Vuex from 'vuex'
import markerStore from '@/store/modules/marker.js'
import userStore from '@/store/modules/user.js'
import likeStore from '@/store/modules/spot/like.js'
import wifiWithStore from '@/store/modules/spot/wifiWith.js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    markerStore,
    userStore,
    likeStore,
    wifiWithStore
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
