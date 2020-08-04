export default {
  namespaced: true,
  state: {
    spots: [],
    filterQuery: {}
  },

  getters: {
    spots(state) {
      return state.spots
    }
  },

  mutations: {
    addSpots(state, payload) {
      state.spots = state.spots.concat(payload)
    },

    clearSpots(state) {
      state.spots = []
    },

    pushSpot(state, spot) {
      state.spots.push(spot)
      // state.spots.unshift(spot)
    },

    // deleteSpot(state, payload) {
    //   state.spots.splice(payload, 1)
    // },

    assignProp(state, { spot, id, prop }) {
      var target = state.spots[id]
      Object.assign(target[prop], spot[prop])
    },

    pushData(state, { data, id, genre }) {
      state.spots[id][genre].push(data)
    },

    deleteData(state, { data, id, genre }) {
      var items = state.spots[id][genre]
      var number = items.findIndex(({ id }) => id === data.id)
      items.splice(number, 1)
    },

    onSpotlight(state, id) {
      state.spots[id].marker.on = true
      state.spots[id].marker.zIndex = 100
    },

    offSpotlight(state) {
      for (let i in state.spots) {
        state.spots[i].marker.on = false
        state.spots[i].marker.zIndex = 10
      }
    }
  },

  actions: {
    addSpots(context, results) {
      return new Promise(resolve => {
        context.commit('addSpots', results)
        resolve()
      })
    },

    clearSpots(context) {
      context.commit('clearSpots')
    },

    spotlight(context, id) {
      context.commit('offSpotlight')
      context.commit('onSpotlight', id)
    }

    // updateSpot(context, { spot, id, params }) {
    //   return new Promise(resolve => {
    //     axiosBase
    //       .patch('/api/v1/spots/' + spot.record.id, params, {
    //         headers: context.rootState.auth.headers
    //       })
    //       .then(function(response) {
    //         response.data['marker'] = spot.marker
    //         response.data.marker.address = response.data.record.address
    //         response.data.marker.name = response.data.record.name
    //         response.data.marker.website = response.data.record.url
    //         context.commit('assignProps', { props: response.data, id: id })
    //         resolve(response.data)
    //       })
    //   })
    // },

    // deleteSpot(context, { spot, id }) {
    //   return new Promise(resolve => {
    //     axiosBase
    //       .delete('/api/v1/spots/' + spot.record.id, {
    //         headers: context.rootState.auth.headers
    //       })
    //       .then(function(response) {
    //         context.commit('deleteSpot', id)
    //         resolve(response.data)
    //       })
    //   })
    // }
  }
}
