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
    addVoteUserStore(state, { spot, data, prop }) {
      const arry = [
        'posts',
        'likes',
        'wifi_withs',
        'wifi_withouts',
        'power_withs',
        'power_withouts',
        'comments'
      ]

      for (let i = 0; i < arry.length; i++) {
        const target = state.user[arry[i]].filter(item => {
          return item.data.place_id == spot.data.place_id
        })

        if (target.length > 0) {
          target[0][prop].push(data)
        }
      }
    },

    // スポットデータを追加します
    addSpotUserStore(state, { spot, tab, prop, unVoteId }) {
      if (
        unVoteId != null &&
        prop ==
          ('wifi_withs' || 'wifi_withouts' || 'power_withs' || 'power_withouts')
      ) {
        let key
        switch (prop) {
          case 'wifi_withs':
            key = 'wifi_withouts'
            break
          case 'wifi_withouts':
            key = 'wifi_withs'
            break
          case 'power_withs':
            key = 'power_withouts'
            break
          case 'power_withouts':
            key = 'power_withs'
            break
        }

        const votes = spot[key]
      }

      const target = state.user[tab].filter(item => {
        return item.data.place_id == spot.data.place_id
      })
    },
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
