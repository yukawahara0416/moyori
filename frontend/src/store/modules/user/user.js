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
    setUserStore(state, payload) {
      state.user = payload
    },

    editUserStore(state, { name, email }) {
      state.user.data.name = name
      state.user.data.email = email
    },

    editUserAvatarStore(state, payload) {
      state.user.avatar = payload
    },

    clearUserStore(state) {
      state.user = {}
    },

    addDataUserStore(state, { spot, data, active_tab, genre }) {
      const targetSpot = state.user[active_tab].filter(function(item) {
        return item.data.place_id == spot.data.place_id
      })
      targetSpot[0][genre].push(data)
    },

    deleteDataUserStore(state, { spot, data, active_tab, genre }) {
      const targetSpot = state.user[active_tab].filter(function(item) {
        return item.marker.place_id == spot.data.place_id
      })
      const items = targetSpot[0][genre]
      const number = items.findIndex(({ id }) => id === data.id)
      items.splice(number, 1)
    },

    onSpotlight(state, { spot, active_tab }) {
      const targetSpot = state.user[active_tab].filter(function(item) {
        return item.marker.place_id == spot.data.place_id
      })
      targetSpot[0].marker.on = true
    },

    offSpotlight(state, active_tab) {
      for (let i in state.user[active_tab]) {
        state.user[active_tab][i].marker.on = false
      }
    }
  },

  actions: {
    getUser(context, id) {
      axiosBase
        .get('/api/v1/users/' + id)
        .then(response => {
          context.commit('setUserStore', response.data)
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

    clearUserStore(context) {
      context.commit('clearUserStore')
    },

    spotlight(context, { spot, active_tab }) {
      context.commit('offSpotlight', active_tab)
      context.commit('onSpotlight', { spot, active_tab })
    }
  }
}
