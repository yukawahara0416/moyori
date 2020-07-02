export default {
  state: {
    message: '',
    color: ''
  },

  mutations: {
    setSnackMessage(state, message) {
      state.message = message
    },

    setSnackColor(state, color) {
      state.color = color
    },

    clearSnackMessage(state) {
      state.message = ''
    }
  },

  actions: {
    pushSnackbar(context, { message, color }) {
      context.commit('setSnackMessage', message)
      context.commit('setSnackColor', color)
    },

    clearSnackMessage(context) {
      context.commit('clearSnackMessage')
    }
  }
}
