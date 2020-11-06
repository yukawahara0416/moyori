export default {
  state: {
    tab: 'posts'
  },

  getters: {
    tab(state) {
      return state.tab
    }
  },

  mutations: {
    changeTab(state, payload) {
      state.tab = payload
    }
  },

  actions: {
    changeTab(context, tabName) {
      context.commit('changeTab', tabName)
    }
  }
}
