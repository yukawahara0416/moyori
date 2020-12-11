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
    pushSnackbarSuccess(context, { message }) {
      context.commit('setMessage', message)
      context.commit('setColor', 'success')
    },

    pushSnackbarError(context, { message }) {
      context.commit('setMessage', message)
      context.commit('setColor', 'error')
    }
  }
}
