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
    addMarkers(state, payload) {
      state.markers = state.markers.concat(payload)
    },
    clearMarkers(state) {
      state.markers = []
    },

    // 直前に選択していたマーカーのアイコンを戻す
    clearIcon(state, id) {
      const target = state.markers[state.cache.id]
      if (state.cache.id >= 0 && state.cache.id != id) {
        target.icon = {
          url: state.cache.icon,
          scaledSize: new google.maps.Size(50, 50)
        }
        state.markers[state.cache.id].zIndex = 1
      }
    },

    // 選択したマーカーのアイコンを記録する（戻すときに必要）
    cacheIcon(state, { marker, id }) {
      if (state.cache.id != id) {
        state.cache = { id: id, icon: marker.icon.url }
      } else {
        state.cache.id = id
      }
    },

    // 選択したマーカーのアイコンを変更する
    setIcon(state, id) {
      const select = state.markers[id]
      select.icon = {
        url: require('@/assets/spotlight.png'),
        scaledSize: new google.maps.Size(50, 50)
      }
      state.markers[id].zIndex = 1000
    }
  },

  actions: {
    addMarkers(context, results) {
      return new Promise(resolve => {
        context.commit('addMarkers', results)
        resolve()
      })
    },

    clearMarkers(context) {
      context.commit('clearMarkers')
    },

    changeIcon(context, { marker, id }) {
      context.commit('clearIcon', id)
      context.commit('cacheIcon', { marker, id })
      context.commit('setIcon', id)
    }
  }
}
