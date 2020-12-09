import { axiosBase } from '@/plugins/axios.js'
import { Spot } from '@/class/Spot.js'
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    spots: [],
    radius: { name: '500m', value: 500 },
    filterQuery: []
  },

  getters: {
    spots(state) {
      return state.spots
    },

    radius(state) {
      return state.radius
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

    // deleteSpot(state, payload) {
    //   state.spots.splice(payload, 1)
    // },

    // スポットに情報を新規追加します
    // 使用例）投票やコメントの投稿をスポットデータへ反映させる
    // @param spot
    // @param data spotに追加したい新規データ（投票やコメントなど）
    // @param prop dataを格納したいプロパティ名（likesやcommentsなど）
    addDataSpotsStore(state, { spot, data, prop }) {
      const target = state.spots.filter(item => {
        return item.data.place_id == spot.data.place_id
      })
      target[0][prop].push(data)
    },

    // スポットの情報を削除します
    // 使用例）投票やコメントの削除をスポットデータへ反映させる
    // spot データを削除したいスポット
    // data spotから削除したいデータ（投票やコメントなど）
    // prop dataが格納されているプロパティ名（likesやcommentsなど）
    deleteDataSpotsStore(state, { spot, data, prop }) {
      const target = state.spots.filter(item => {
        return item.data.place_id == spot.data.place_id
      })
      const items = target[0][prop]
      const index = items.findIndex(({ id }) => id === data.id)
      items.splice(index, 1)
    },

    // スポットの情報を更新します
    // 使用例）スポット名や住所などの変更をスポットデータへ反映させる
    // spot データを更新したいスポット
    // data spotで更新したいデータ（スポット名・住所など）
    updateDataSpotsStore(state, { spot, data }) {
      const target = state.spots.filter(item => {
        return item.data.place_id == spot.data.place_id
      })
      _.merge(target[0], data)
    },

    setRadius(state, payload) {
      state.radius = payload
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
    updateSpot(context, { spot, form_data, headers }) {
      return axiosBase
        .patch('/api/v1/spots/' + spot.data.id, form_data, { headers })
        .then(response => {
          context.commit('updateDataSpotsStore', {
            spot,
            data: response.data.data
          })
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
