import { axiosBase } from '@/plugins/axios.js'

export default {
  actions: {
    like(context, { spot, type }) {
      const params = { spot_id: spot.data.id }
      axiosBase
        .post('/api/v1/likes', params, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          type === 'map'
            ? context.commit('spot/pushData', {
                spot: spot,
                data: response.data,
                genre: 'likes'
              })
            : context.commit('user/addDataUserStore', {
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

    unlike(context, { spot, like, type }) {
      const params = { id: like.id }
      axiosBase
        .delete('/api/v1/likes/' + params.id, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          type === 'map'
            ? context.commit('spot/deleteData', {
                spot: spot,
                data: response.data,
                genre: 'likes'
              })
            : context.commit('user/deleteDataUserStore', {
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
