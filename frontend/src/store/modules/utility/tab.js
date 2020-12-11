export default {
  state: {
    signTab: 'signin',
    profileTab: 'posts'
  },

  getters: {
    signTab(state) {
      return state.signTab
    },

    profileTab(state) {
      return state.profileTab
    }
  },

  mutations: {
    changeSignTab(state, payload) {
      state.signTab = payload
    },

    changeProfileTab(state, payload) {
      state.profileTab = payload
    }
  }
}
