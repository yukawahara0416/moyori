import { axiosBase } from '@/plugins/axios.js'
import merge from 'lodash/merge'

export default {
  namespaced: true,
  state: {
    user: {}
  },

  getters: {
    user(state) {
      return state.user
    }
  },

  mutations: {
    // マイページで使用するユーザデータを格納します
    setUserStore(state, payload) {
      state.user = payload
    },

    // ユーザデータを更新します
    updateUserStore(state, { name, email, avatar }) {
      state.user.data.name = name
      state.user.data.email = email
      state.user.data.avatar = avatar
    },

    // ユーザデータを初期化します
    clearUserStore(state) {
      state.user = {}
    },

    // 投票データを追加します

      target[0][prop].push(data)
    },

    // ユーザが保有するスポットの情報を削除します
    deleteDataUserStore(state, { spot, data, tab, prop }) {
      const target = state.user[tab].filter(item => {
        return item.data.place_id == spot.data.place_id
      })
      const items = target[0][prop]
      const index = items.findIndex(({ id }) => id === data.id)
      items.splice(index, 1)
    },

    // ユーザが保有するスポットの情報を更新します
    updateDataUserStore(state, { spot, data, tab, isMyPage }) {
      const arry = isMyPage
        ? [
            'posts',
            'likes',
            'wifi_withs',
            'wifi_withouts',
            'power_withs',
            'power_withouts',
            'comments'
          ]
        : [tab]

      for (let i = 0; i < arry.length; i++) {
        const target = state.user[arry[i]].filter(item => {
          return item.data.place_id == spot.data.place_id
        })

        merge(target[0], data)
      }
    },

    onSpotlight(state, { spot, tab }) {
      const target = state.user[tab].filter(item => {
        return item.data.place_id == spot.data.place_id
      })
      target[0].data.on = true
    },

    offSpotlight(state, tab) {
      for (let i in state.user[tab]) {
        state.user[tab][i].data.on = false
      }
    }
  },

  actions: {
    getUser(context, id) {
      return axiosBase
        .get(`/api/v1/users/${id}`)
        .then(response => {
          return response
        })
        .catch(() => {
          throw new Error('ユーザ情報の取得に失敗しました')
        })
    },

    spotlight(context, { spot, tab }) {
      context.commit('offSpotlight', tab)
      context.commit('onSpotlight', { spot, tab })
    }
  }
}
