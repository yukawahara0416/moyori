import { axiosBase } from '@/plugins/axios.js'
import router from '@/router'

export default {
  actions: {
    like(context, { spot, active_tab }) {
      axiosBase
        .post(
          '/api/v1/likes',
          { spot_id: spot.data.id },
          {
            headers: context.rootState.auth.headers
          }
        )
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
              active_tab: active_tab,
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

    unlike(context, { spot, data, active_tab }) {
      axiosBase
        .delete('/api/v1/likes/' + data.id, {
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
              active_tab: active_tab,
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
