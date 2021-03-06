import merge from 'lodash/merge'

export default {
  namespaced: true,
  state: {
    spots: [],
    radius: { name: '500m', value: 500 },
    type: { name: 'カフェ', value: 'cafe' },
    filterQuery: []
  },

  getters: {
    spots(state) {
      return state.spots
    },

    radius(state) {
      return state.radius
    },

    type(state) {
      return state.type
    },

    filterQuery(state) {
      return state.filterQuery
    },

    // スポットを絞り込みます
    filteredSpots(state) {
      let data = state.spots

      const hasWifiWiths = state.filterQuery.includes('wifi_withs')
      const hasPowerWiths = state.filterQuery.includes('power_withs')
      const hasLikes = state.filterQuery.includes('likes')
      const hasComments = state.filterQuery.includes('comments')

      if (hasWifiWiths)
        data = data.filter(item => {
          return item['wifi_withs'].length > 0
        })

      if (hasPowerWiths)
        data = data.filter(item => {
          return item['power_withs'].length > 0
        })

      if (hasLikes)
        data = data.filter(item => {
          return item['likes'].length > 0
        })

      if (hasComments)
        data = data.filter(item => {
          return item['comments'].length > 0
        })

      return data
    }
  },

  mutations: {
    // スポットデータを格納します
    setSpots(state, payload) {
      state.spots = [...state.spots, ...payload]
    },

    // スポットデータを初期化します
    clearSpots(state) {
      state.spots = []
    },

    // スポットを追加します
    addSpot(state, spot) {
      state.spots.unshift(spot)
    },

    // 投票を追加します
    addVote(state, { vote, prop, place_id }) {
      const target = state.spots.find(obj => obj.data.place_id === place_id)
      target[prop].push(vote)
    },

    // スポットを削除します
    deleteSpot(state, spot_id) {
      const result = state.spots.filter(obj => obj.data.id !== spot_id)
      state.spots = result
    },

    // 投票を削除します
    deleteVote(state, { vote_id, place_id, prop }) {
      const target = state.spots.find(obj => obj.data.place_id === place_id)
      const votes = target[prop]
      const result = votes.filter(obj => obj.id !== vote_id)
      target[prop] = result
    },

    // スポットを更新します
    updateSpot(state, { place_id, updated }) {
      const target = state.spots.find(obj => obj.data.place_id === place_id)
      merge(target, updated)
    },

    setRadius(state, payload) {
      state.radius = payload
    },

    setType(state, payload) {
      state.type = payload
    },

    setFilterQuery(state, payload) {
      state.filterQuery = payload
    },

    onSpotlight(state, place_id) {
      const target = state.spots.find(obj => obj.data.place_id === place_id)
      target.data.on = true
      target.data.zIndex = 100
    },

    offSpotlight(state) {
      for (let i in state.spots) {
        state.spots[i].data.on = false
        state.spots[i].data.zIndex = 10
      }
    }
  },

  actions: {
    spotlight(context, place_id) {
      context.commit('offSpotlight')
      context.commit('onSpotlight', place_id)
    }
  }
}
