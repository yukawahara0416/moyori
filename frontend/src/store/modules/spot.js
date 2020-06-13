import axios from 'axios'

const axiosBase = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
})

import likeStore from '@/store/modules/spot/like.js'
import wifiWithStore from '@/store/modules/spot/wifiWith.js'
import wifiWithoutStore from '@/store/modules/spot/wifiWithout.js'
import powerWithStore from '@/store/modules/spot/powerWith.js'
import powerWithoutStore from '@/store/modules/spot/powerWithout.js'
import commentStore from '@/store/modules/spot/comment.js'

export default {
  modules: {
    likeStore,
    wifiWithStore,
    wifiWithoutStore,
    powerWithStore,
    powerWithoutStore,
    commentStore
  },

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

    addData(state, { data, id, key }) {
      state.spots[id][key].push(data)
    },

    deleteData(state, { data, id, key }) {
      var values = state.spots[id][key]
      var index = values.findIndex(({ id }) => id === data.id)
      values.splice(index, 1)
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
            if (context.getters.spots.length >= id) {
              context.commit('assignProps', { props: response.data, id: id })
              resolve(response.data)
            } else {
              response.data['marker'] = spot.marker
              context.dispatch('addSpots', response.data)
            }
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
