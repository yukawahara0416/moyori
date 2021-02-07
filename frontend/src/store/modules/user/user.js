import { axiosBase } from '@/plugins/axios.js'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

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
        [
          'wifi_withs',
          'wifi_withouts',
          'power_withs',
          'power_withouts'
        ].includes(prop)
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
        const index = votes.findIndex(({ id }) => id === unVoteId.id)
        votes.splice(index, 1)
        state.user[prop].push(cloneDeep(spot))
        return
      }

    // スポットを削除します（プロパティを指定）
    deleteSpotOneProperty(state, { spot_id, prop }) {
      const arr = state.user[prop]
      const result = arr.filter(obj => obj.data.id !== spot_id)
      state.user[prop] = result
    },

    // スポットを削除します（全プロパティ）
    deleteSpotAllProperty(state, spot_id) {
      const keys = Object.keys(state.user)

      for (let i = 0; i < keys.length; i++) {
        if (keys[i] == 'data') continue

        const spots = state.user[keys[i]]
        const result = spots.filter(obj => obj.data.id !== spot_id)
        state.user[keys[i]] = result
      }
    },

    // 投票データを削除します
    deleteVoteUserStore(state, { spot, data, prop }) {
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
          const votes = target[0][prop]
          const index = votes.findIndex(({ id }) => id === data.id)
          votes.splice(index, 1)
        }
      }
    },

    // スポットデータを削除します
    deleteSpotUserStore(state, { data, prop }) {
      const target = state.user[prop]
      const index = target.findIndex(({ id }) => id === data.id)
      target.splice(index, 1)
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

    onSpotlight(state, { place_id, tab }) {
      const target = state.user[tab].find(obj => obj.data.place_id === place_id)
      target.data.on = true
    },

    offSpotlight(state, tab) {
      for (let i in state.user[tab]) {
        state.user[tab][i].data.on = false
      }
    }
  },

  actions: {
    deleteSpot(context, { spot_id, prop = null }) {
      if (prop === 'comments') return

      prop !== null
        ? context.commit('deleteSpotOneProperty', { spot_id, prop })
        : context.commit('deleteSpotAllProperty', spot_id)
    },

    spotlight(context, { place_id, tab }) {
      context.commit('offSpotlight', tab)
      context.commit('onSpotlight', { place_id, tab })
    }
  }
}
