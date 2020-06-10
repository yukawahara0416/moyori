import Vue from 'vue'
import Vuex from 'vuex'
import userStore from '@/store/modules/user.js'
import markerStore from '@/store/modules/marker.js'
import likeStore from '@/store/modules/spot/like.js'
import wifiWithStore from '@/store/modules/spot/wifiWith.js'
import wifiWithoutStore from '@/store/modules/spot/wifiWithout.js'
import powerWithStore from '@/store/modules/spot/powerWith.js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userStore,
    markerStore,
    likeStore,
    wifiWithStore,
    wifiWithoutStore,
    powerWithStore
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
