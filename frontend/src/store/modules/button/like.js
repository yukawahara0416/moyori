import { axiosBase } from '@/plugins/axios.js'

export default {
  actions: {
    like(context, { spot, type }) {
      var params = { spot_id: spot.data.id }
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
            : context.commit('user/addUserData', {
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

    // 修正点 index_idではなくdata.place_idを参照する方法に変更する
    unlike(context, { like, id, type }) {
      var params = { id: like.id }
      axiosBase
        .delete('/api/v1/likes/' + params.id, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          // 修正点 index_idではなくdata.place_idを参照する方法に変更する
          type === 'map'
            ? context.commit('spot/deleteData', {
                data: response.data,
                id: id,
                genre: 'likes'
              })
            : context.commit('user/deleteUserData', {
                data: response.data,
                id: id,
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
