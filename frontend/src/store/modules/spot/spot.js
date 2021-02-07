import { axiosBase } from '@/plugins/axios.js'
import { Spot } from '@/class/Spot.js'
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
    // スポット配列に、検索結果を追加します
    addSpotsStore(state, payload) {
      state.spots = [...state.spots, ...payload]
    },

    // スポット配列の先頭に、スポットを追加します
    unshiftSpotsStore(state, spot) {
      state.spots.unshift(spot)
    },

    // スポット配列を初期化します
    clearSpotsStore(state) {
      state.spots = []
    },

    // スポットを削除します
    deleteSpot(state, spot_id) {
      const result = state.spots.filter(obj => obj.data.id !== spot_id)
      state.spots = result
    },

    // スポットに情報を新規追加します
    addDataSpotsStore(state, { spot, data, prop }) {
      const target = state.spots.filter(item => {
        return item.data.place_id == spot.data.place_id
      })
      target[0][prop].push(data)
    },

    deleteSpot(state, spot_id) {
      merge(target[0], data)
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

    onSpotlight(state, spot) {
      const target = state.spots.filter(item => {
        return item.data.place_id == spot.data.place_id
      })
      target[0].data.on = true
      target[0].data.zIndex = 100
    },

    offSpotlight(state) {
      for (let i in state.spots) {
        state.spots[i].data.on = false
        state.spots[i].data.zIndex = 10
      }
    }
  },

  actions: {
    // スポットを登録します
    postSpot(context, { params, headers }) {
      return axiosBase
        .post('/api/v1/spots', params, { headers })
        .then(response => {
          return new Spot(response.data)
        })
        .catch(() => {
          throw new Error('スポットの登録に失敗しました')
        })
    },

    // ユーザが作成したスポット情報を更新します
    updateSpot(context, { spot, params, headers }) {
      return axiosBase
        .patch(`/api/v1/spots/${spot.data.id}`, params, { headers })
        .then(response => {
          return response
        })
        .catch(() => {
          throw new Error('スポットの更新に失敗しました')
        })
    },

    spotlight(context, spot) {
      context.commit('offSpotlight')
      context.commit('onSpotlight', spot)
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
