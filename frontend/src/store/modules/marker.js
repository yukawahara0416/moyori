import Vue from 'vue'
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
    markers: [],
    cache: { id: -1, icon: '' }
  },

  getters: {
    markers(state) {
      return state.markers
    },

    cache(state) {
      return state.cache
    }
  },

  mutations: {
    setMarkers(state, payload) {
      state.markers = state.markers.concat(payload)
    },

    clearMarkers(state) {
      state.markers = []
    },

    // アイコンを戻す
    clearIcon(state, id) {
      const target = state.markers[state.cache.id]
      if (state.cache.id >= 0 && state.cache.id != id) {
        target.data.icon = {
          url: state.cache.icon.url,
          scaledSize: new google.maps.Size(50, 50)
        }
        target.data.zIndex = 10
      }
    },

    // アイコンを記録する
    cacheIcon(state, { marker, id }) {
      if (state.cache.id != id) {
        state.cache = { id: id, icon: marker.data.icon }
      }
    },

    // アイコンを変更する
    setIcon(state, id) {
      const target = state.markers[id]
      target.data.icon = {
        url: require('@/assets/spotlight.png'),
        scaledSize: new google.maps.Size(50, 50)
      }
      target.data.zIndex = 100
    },

    addProps(state, { response, id }) {
      Vue.set(state.markers[id], 'record', response.data.record)
    }
  },

  actions: {
    setMarkers(context, results) {
      return new Promise(resolve => {
        context.commit('setMarkers', results)
        resolve()
      })
    },

    clearMarkers(context) {
      context.commit('clearMarkers')
    },

    postMarker(context, { marker, id }) {
      const params = { spot: { place_id: marker.data.place_id } }
      axiosBase
        .post('/api/v1/spots', params, {
          headers: context.rootState.userStore.headers
        })
        .then(function(response) {
          context.commit('addProps', { response: response, id: id })
        })
    },

    setCurrentMarker(context, { marker, id }) {
      context.commit('clearIcon', id)
      context.commit('cacheIcon', { marker, id })
      context.commit('setIcon', id)
    }
  }
}
