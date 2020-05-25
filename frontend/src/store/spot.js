export default {
  state: {
    markers: [{ name: 'hoge', position: { lat: 33.574, lng: 130.331 } }]
  },
  actions: {},
  getters: {
    markers(state) {
      return state.markers
    }
  },
  mutations: {}
}
