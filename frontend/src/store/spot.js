export default {
  state: {
    markers: []
  },
  getters: {
    markers(state) {
      return state.markers
    }
  },
  mutations: {
    addMarkers(state, payload) {
      state.markers = state.markers.concat(payload)
    },
    clearMarkers(state) {
      state.markers = []
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
    }
  }
}
