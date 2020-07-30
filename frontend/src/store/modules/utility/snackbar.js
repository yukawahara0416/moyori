export default {
  state: {
    message: '',
    color: ''
  },

  mutations: {
    setMessage(state, message) {
      state.message = message
    },

    setColor(state, color) {
      state.color = color
    },

    clearMessage(state) {
      state.message = ''
    }
  },

  actions: {
    pushSnackbar(context, { message, color }) {
      context.commit('setMessage', message)
      context.commit('setColor', color)
    },

    clearSnackbar(context) {
      context.commit('clearMessage')
    }
  }
}
