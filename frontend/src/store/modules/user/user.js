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

    addUserData(state, { spot, data, type, genre }) {
      const target = state.user[type].filter(function(item) {
        return item.marker.place_id == spot.data.place_id
      })
      target[0][genre].push(data)
    },

    deleteUserData(state, { spot, data, type, genre }) {
      const target = state.user[type].filter(function(item) {
        return item.marker.place_id == spot.data.place_id
      })
      const items = target[0][genre]
      const number = items.findIndex(({ id }) => id === data.id)
      items.splice(number, 1)
    },

    onSpotlight(state, { spot, type }) {
      const target = state.user[type].filter(function(item) {
        return item.marker.place_id == spot.data.place_id
      })
      target[0].marker.on = true
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

    spotlight(context, { spot, type }) {
      context.commit('offSpotlight', type)
      context.commit('onSpotlight', { spot, type })
    }
  }
}
