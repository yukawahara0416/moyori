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

    filteredSpots(state) {
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
    addSpotsStore(state, payload) {
      state.spots = state.spots.concat(payload)
    },

    unshiftSpotsStore(state, spot) {
      state.spots.unshift(spot)
    },

    clearSpotsStore(state) {
      state.spots = []
    },

    // deleteSpot(state, payload) {
    //   state.spots.splice(payload, 1)
    // },

    updateDataSpotsStore(state, { spot, data, prop }) {
      const targetSpot = state.spots.filter(function(item) {
        return item.marker.place_id == spot.marker.place_id
      })
      targetSpot[0][prop] = data
    },

    pushDataSpotsStore(state, { spot, data, genre }) {
      const targetSpot = state.spots.filter(function(item) {
        // if (item.marker.place_id !== null) {
        return item.marker.place_id == spot.data.place_id
        // }
      })
      targetSpot[0][genre].push(data)
    },

    deleteDataSpotsStore(state, { spot, data, genre }) {
      const targetSpot = state.spots.filter(function(item) {
        return item.marker.place_id == spot.data.place_id
      })
      const items = targetSpot[0][genre]
      const number = items.findIndex(({ id }) => id === data.id)
      items.splice(number, 1)
    },

    onSpotlight(state, spot) {
      const targetSpot = state.spots.filter(function(item) {
        return item.marker.place_id == spot.marker.place_id
      })
      targetSpot[0].marker.on = true
      targetSpot[0].marker.zIndex = 100
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
    addSpotsStore(context, results) {
      return new Promise(resolve => {
        context.commit('addSpotsStore', results)
        resolve()
      })
    },

    clearSpotsStore(context) {
      context.commit('clearSpotsStore')
    },

    spotlight(context, spot) {
      context.commit('offSpotlight')
      context.commit('onSpotlight', spot)
    },

    formatSpot(context, res) {
      return new Promise(resolve => {
        const image =
          'photos' in res
            ? res.photos[0].getUrl({ maxWidth: 320 })
            : require('@/assets/noimage.png')

        const formatted = {
          marker: {
            address: 'vicinity' in res ? res.vicinity : null,
            name: 'name' in res ? res.name : null,
            phone: 'phone' in res ? res.phone : null,
            place_id: 'place_id' in res ? res.place_id : null,
            image: image,
            position: {
              lat: res.geometry.location.lat(),
              lng: res.geometry.location.lng()
            },
            on: false,
            zIndex: 10
          },
          detail: {},
          data: {},
          likes: [],
          wifi_withs: [],
          wifi_withouts: [],
          power_withs: [],
          power_withouts: [],
          comments: []
        }

        resolve(formatted)
      })
    }

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
