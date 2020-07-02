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
  },

  actions: {
    loadingOn(context) {
      context.commit('loadingOn')
    },

    loadingOff(context) {
      context.commit('loadingOff')
    }
  }
}
