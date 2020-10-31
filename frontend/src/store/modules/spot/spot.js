export default {
  namespaced: true,
  state: {
    spots: [],
    filterQuery: {}
  },

  getters: {
    spots(state) {
      return state.spots
    },

    filterSpots(state) {
      let data = state.spots

      // いいね
      if (state.filterQuery.likes) {
        data = data.filter(function(item) {
          return item['likes'].length > 0
        })
      }

      // Wifi
      if (state.filterQuery.wifi_withs) {
        data = data.filter(function(item) {
          return item['wifi_withs'].length > 0
        })
      }

      // 電源
      if (state.filterQuery.power_withs) {
        data = data.filter(function(item) {
          return item['power_withs'].length > 0
        })
      }

      // コメント
      if (state.filterQuery.comments) {
        data = data.filter(function(item) {
          return item['comments'].length > 0
        })
      }

      return data
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
      state.spots.unshift(spot)
    },

    // deleteSpot(state, payload) {
    //   state.spots.splice(payload, 1)
    // },

    assignProp(state, { spot, prop }) {
      const target = state.spots.filter(function(item) {
        if (item.marker.place_id !== null && spot.marker) {
          return item.marker.place_id == spot.marker.place_id
        } else {
          return item.marker.place_id == spot.data.place_id
        }
      })
      Object.assign(target[0][prop], spot[prop])
    },

    pushData(state, { spot, data, genre }) {
      const target = state.spots.filter(function(item) {
        if (item.marker.place_id !== null) {
          return item.marker.place_id == spot.data.place_id
        }
      })
      target[0][genre].push(data)
    },

    updateData(state, { spot, data }) {
      const target = state.spots.filter(function(item) {
        if (item.marker.place_id !== null) {
          return item.marker.place_id == spot.data.place_id
        }
      })
      Object.assign(target[0].data, data.data)
      Object.assign(target[0].marker, data.data)
      target[0].picture = data.picture
    },

    deleteData(state, { spot, data, genre }) {
      const target = state.spots.filter(function(item) {
        return item.marker.place_id == spot.data.place_id
      })
      const items = target[0][genre]
      const number = items.findIndex(({ id }) => id === data.id)
      items.splice(number, 1)
    },

    onSpotlight(state, spot) {
      const target = state.spots.filter(function(item) {
        return item.marker.place_id == spot.marker.place_id
      })
      target[0].marker.on = true
      target[0].marker.zIndex = 100
    },

    offSpotlight(state) {
      for (let i in state.spots) {
        state.spots[i].marker.on = false
        state.spots[i].marker.zIndex = 10
      }
    },

    setFilterQuery(state, filterQuery) {
      state.filterQuery = filterQuery
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

    spotlight(context, spot) {
      context.commit('offSpotlight')
      context.commit('onSpotlight', spot)
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
