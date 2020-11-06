import { axiosBase } from '@/plugins/axios.js'
import router from '@/router'

export default {
  actions: {
    like(context, { spot, type }) {
      const params = { spot_id: spot.data.id }
      axiosBase
        .post('/api/v1/likes', params, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          if (router.currentRoute.name == 'search')
            context.commit('spot/pushDataSpotsStore', {
              spot: spot,
              data: response.data,
              genre: 'likes'
            })

          if (router.currentRoute.name == 'profile')
            context.commit('user/addDataUserStore', {
              spot: spot,
              data: response.data,
              type: type,
              genre: 'likes'
            })

          context.dispatch('pushSnackbar', {
            message: 'いいねしました　投票ありがとうございます！',
            color: 'success'
          })
        })
        .catch(() => {
          context.dispatch('pushSnackbar', {
            message: 'いいねに失敗しました',
            color: 'error'
          })
        })
    },

    unlike(context, { spot, data, type }) {
      const params = { id: data.id }
      axiosBase
        .delete('/api/v1/likes/' + params.id, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          if (router.currentRoute.name == 'search')
            context.commit('spot/deleteDataSpotsStore', {
              spot: spot,
              data: response.data,
              genre: 'likes'
            })

          if (router.currentRoute.name == 'profile')
            context.commit('user/deleteDataUserStore', {
              spot: spot,
              data: response.data,
              type: type,
              genre: 'likes'
            })

          context.dispatch('pushSnackbar', {
            message: 'いいねを取り消しました',
            color: 'success'
          })
        })
        .catch(() => {
          context.dispatch('pushSnackbar', {
            message: 'いいねの取り消しに失敗しました',
            color: 'error'
          })
        })
    }
  }
}
