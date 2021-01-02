export default {
  state: {
    map: null,
    google: null
  },

  getters: {
    map(state) {
      return state.map
    },

    google(state) {
      return state.google
    }
  },

  mutations: {
    mapMutation(state, payload) {
      state.map = payload
    },

    googleMutation(state, payload) {
      state.google = payload
    }
  }
}
