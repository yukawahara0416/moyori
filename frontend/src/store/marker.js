export default {
  state: {
    markers: [],
    currentMarker: { id: -1, icon: '' }
  },

  getters: {
    markers(state) {
      return state.markers
    },
    currentMarker(state) {
      return state.currentMarker
    }
  },

  mutations: {
    setMarkers(state, payload) {
      state.markers = state.markers.concat(payload)
    },

    clearMarkers(state) {
      state.markers = []
    },

    setCurrentMarker(state, payload) {
      state.currentMarker = payload
    },

    clearCurrentMarker(state) {
      state.currentMarker = { id: -1, icon: '' }
    },

    // 直前に選択していたマーカーのアイコンを戻す
    clearIcon(state, id) {
      const target = state.markers[state.currentMarker.id]
      if (state.currentMarker.id >= 0 && state.currentMarker.id != id) {
        target.icon = {
          url: state.currentMarker.icon,
          scaledSize: new google.maps.Size(50, 50)
        }
        state.markers[state.currentMarker.id].zIndex = 1
      }
    },

    // 選択したマーカーのアイコンを記録する（戻すときに必要）
    cacheIcon(state, { marker, id }) {
      if (state.currentMarker.id != id) {
        state.currentMarker = { id: id, icon: marker.icon.url }
      } else {
        state.currentMarker.id = id
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
    setMarkers(context, results) {
      return new Promise(resolve => {
        context.commit('setMarkers', results)
        resolve()
      })
    },

    clearMarkers(context) {
      context.commit('clearMarkers')
    },

    setCurrentMarker(context, newVal) {
      context.commit('setCurrentMarker', newVal)
    },

    clearCurrentMarker(context) {
      context.commit('clearCurrentMarker')
    },

    changeIcon(context, { marker, id }) {
      context.commit('clearIcon', id)
      context.commit('cacheIcon', { marker, id })
      context.commit('setIcon', id)
    }
  }
}
