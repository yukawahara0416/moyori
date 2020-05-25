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
    pushToMarkers(state, payload) {
      state.markers = state.markers.concat(payload)
    }
  },
  actions: {
    pushToMarkers(context, results) {
      return new Promise(resolve => {
        context.commit('pushToMarkers', results)
        resolve()
      })
    }
  }
}
