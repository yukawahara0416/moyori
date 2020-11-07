export default {
  state: {
    message: '',
    color: ''
  },

  mutations: {
    setMessage(state, payload) {
      state.message = payload
    },

    setColor(state, payload) {
      state.color = payload
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
