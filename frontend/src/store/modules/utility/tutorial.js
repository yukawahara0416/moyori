export default {
  state: {
    tutorialState: true
  },

  getters: {
    tutorialState(state) {
      return state.tutorialState
    }
  },

  mutations: {
    closeTutorial(state) {
      state.tutorialState = false
    }
  }
}
