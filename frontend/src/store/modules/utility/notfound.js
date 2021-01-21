export default {
  state: {
    notFound: false
  },

  getters: {
    isNotFound(state) {
      return state.notFound
    }
  },

  mutations: {
    setNotFound(state, val) {
      state.notFound = val
    }
  }
}
