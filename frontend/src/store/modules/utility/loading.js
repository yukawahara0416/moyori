export default {
  state: {
    loading: false
  },

  getters: {
    loading(state) {
      return state.loading
    }
  },

  mutations: {
    loadingOn(state) {
      state.loading = true
    },

    loadingOff(state) {
      state.loading = false
    }
  }
}
