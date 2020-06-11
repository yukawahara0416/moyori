import axios from 'axios'

const axiosBase = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
})

export default {
  state: {
    spots: [],
    cache: { id: -1, icon: '' }
  },

  getters: {
    spots(state) {
      return state.spots
    },

    cache(state) {
      return state.cache
    }
  },

  mutations: {
    addSpots(state, payload) {
      state.spots = state.spots.concat(payload)
    },

    clearSpots(state) {
      state.spots = []
    },

    assignProps(state, { props, id }) {
      var spot = state.spots[id]
      Object.assign(spot, props)
    },

    //// addData
    addLike(state, { like, id }) {
      state.spots[id].likes.push(like)
    },

    addWifiWith(state, { wifiWith, id }) {
      state.spots[id].wifi_withs.push(wifiWith)
    },

    addWifiWithout(state, { wifiWithout, id }) {
      state.spots[id].wifi_withouts.push(wifiWithout)
    },

    addPowerWith(state, { powerWith, id }) {
      state.spots[id].power_withs.push(powerWith)
    },

    addPowerWithout(state, { powerWithout, id }) {
      state.spots[id].power_withouts.push(powerWithout)
    },

    addComment(state, { comment, id }) {
      state.spots[id].comments.push(comment)
    },

    //// deleteData
    deleteLike(state, { like, id }) {
      var likes = state.spots[id].likes
      var index = likes.findIndex(({ id }) => id === like.id)
      likes.splice(index, 1)
    },

    deleteWifiWith(state, { wifiWith, id }) {
      var wifiWiths = state.spots[id].wifi_withs
      var index = wifiWiths.findIndex(({ id }) => id === wifiWith.id)
      wifiWiths.splice(index, 1)
    },

    deleteWifiWithout(state, { wifiWithout, id }) {
      var wifiWithouts = state.spots[id].wifi_withouts
      var index = wifiWithouts.findIndex(({ id }) => id === wifiWithout.id)
      wifiWithouts.splice(index, 1)
    },

    deletePowerWith(state, { powerWith, id }) {
      var powerWiths = state.spots[id].power_withs
      var index = powerWiths.findIndex(({ id }) => id === powerWith.id)
      powerWiths.splice(index, 1)
    },

    deletePowerWithout(state, { powerWithout, id }) {
      var powerWithouts = state.spots[id].power_withouts
      var index = powerWithouts.findIndex(({ id }) => id === powerWithout.id)
      powerWithouts.splice(index, 1)
    },

    deleteComment(state, { comment, id }) {
      var comments = state.spots[id].comments
      var index = comments.findIndex(({ id }) => id === comment.id)
      comments.splice(index, 1)
    },

    // アイコンを戻す
    clearMarkerIcon(state, id) {
      const spot = state.spots[state.cache.id]
      if (state.cache.id >= 0 && state.cache.id != id) {
        spot.marker.icon = {
          url: state.cache.icon.url,
          scaledSize: new google.maps.Size(50, 50)
        }
        spot.marker.zIndex = 10
      }
    },

    // アイコンを記録する
    cacheMarkerIcon(state, { marker, id }) {
      if (state.cache.id != id) {
        state.cache = { id: id, icon: marker.icon }
      }
    },

    // アイコンを変更する
    setMarkerIcon(state, id) {
      const spot = state.spots[id]
      spot.marker.icon = {
        url: require('@/assets/spotlight.png'),
        scaledSize: new google.maps.Size(50, 50)
      }
      spot.marker.zIndex = 100
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

    postSpot(context, { spot, id }) {
      return new Promise(resolve => {
        const params = { spot: { place_id: spot.marker.place_id } }
        axiosBase
          .post('/api/v1/spots', params, {
            headers: context.rootState.userStore.headers
          })
          .then(function(response) {
            context.commit('assignProps', { props: response.data, id: id })
            resolve(response.data)
          })
      })
    },

    setCurrentMarker(context, { marker, id }) {
      context.commit('clearMarkerIcon', id)
      context.commit('cacheMarkerIcon', { marker, id })
      context.commit('setMarkerIcon', id)
    }
  }
}
