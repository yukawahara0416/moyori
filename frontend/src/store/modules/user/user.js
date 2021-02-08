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
    // ユーザデータを格納します
    setUser(state, payload) {
      state.user = payload
    },

    // ユーザデータを初期化します
    clearUser(state) {
      state.user = {}
    },

    // スポットを追加します（プロパティを指定）
    addSpot(state, { spot, prop }) {
      state.user[prop].push(cloneDeep(spot))
    },

    // スポットを追加します（反対のプロパティを指定）
    addSpotReverse(state, { spot, prop, vote_id }) {
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
        default:
          key = prop
      }

      const votes = spot[key]
      const result = votes.filter(obj => obj.id !== vote_id)
      spot[key] = result
      state.user[prop].push(cloneDeep(spot))
    },

    // 投票を追加します
    addVote(state, { vote, prop, place_id }) {
      const keys = Object.keys(state.user)

      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === 'data') continue

        const target = state.user[keys[i]].find(
          obj => obj.data.place_id === place_id
        )

        if (target === undefined) continue

        target[prop].push(vote)
      }
    },

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

    // ユーザデータを更新します
    updateUser(state, { name, email, avatar }) {
      state.user.data.name = name
      state.user.data.email = email
      state.user.data.avatar = avatar
    },

    // スポットを更新します
    updateSpot(state, { place_id, updated, tab, isMyPage }) {
      const keys = isMyPage ? Object.keys(state.user) : [tab]

      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === 'data') continue
        const target = state.user[keys[i]].find(
          obj => obj.data.place_id === place_id
        )

        merge(target, updated)
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
    // プロフィール画面での投票時に対応するタブにスポットを追加します
    addSpot(context, { spot, prop, vote_id = null }) {
      if (prop === 'comments') return

      const wasUnVote = vote_id !== null
      const isReverseVote = [
        'wifi_withs',
        'wifi_withouts',
        'power_withs',
        'power_withouts'
      ].includes(prop)

      wasUnVote && isReverseVote
        ? context.commit('addSpotReverse', { spot, prop, vote_id })
        : context.commit('addSpot', { spot, prop })
    },

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
