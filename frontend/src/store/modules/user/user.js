import { axiosBase } from '@/plugins/axios.js'

export default {
  namespaced: true,
  state: {
    user: {}
  },

  getters: {
    user(state) {
      return state.user
    }
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload
    },

    clearUser(state) {
      state.user = {}
    },

    addUserData(state, { data, id, type, genre }) {
      state.user[type][id][genre].push(data)
    },

    deleteUserData(state, { data, id, type, genre }) {
      var items = state.user[type][id][genre]
      var number = items.findIndex(({ id }) => id === data.id)
      items.splice(number, 1)
    },

    onSpotlight(state, { id, type }) {
      state.user[type][id].marker.on = true
    },

    offSpotlight(state, type) {
      for (let i in state.user[type]) {
        state.user[type][i].marker.on = false
      }
    }
  },

  actions: {
    setUser(context, response) {
      context.commit('setUser', response)
    },

    getUser(context, id) {
      axiosBase
        .get('/api/v1/users/' + id)
        .then(response => {
          context.dispatch('setUser', response.data)
        })
        .catch(() => {
          context.dispatch(
            'pushSnackbar',
            {
              message: '予期しないエラーが発生しました',
              color: 'error'
            },
            { root: true }
          )
        })
    },

    clearUser(context) {
      context.commit('clearUser')
    },

    spotlight(context, { id, type }) {
      context.commit('offSpotlight', type)
      context.commit('onSpotlight', { id, type })
    }
  }
}
