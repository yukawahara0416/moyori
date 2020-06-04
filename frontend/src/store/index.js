import Vue from 'vue'
import Vuex from 'vuex'
import markerStore from '@/store/modules/marker.js'
import userStore from '@/store/modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    markerStore,
    userStore
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})
