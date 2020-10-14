import { axiosBase } from '@/plugins/axios.js'

export default {
  actions: {
    postComment(context, { spot, content, type }) {
      const params = { spot_id: spot.data.id, content: content }
      axiosBase
        .post('/api/v1/comments', params, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          type === 'map'
            ? context.commit('spot/pushData', {
                spot: spot,
                data: response.data,
                genre: 'comments'
              })
            : context.commit('user/addUserData', {
                spot: spot,
                data: response.data,
                type: type,
                genre: 'comments'
              })
          context.dispatch('pushSnackbar', {
            message: 'コメントを投稿しました ありがとうございます！',
            color: 'success'
          })
        })
        .catch(() => {
          context.dispatch('pushSnackbar', {
            message: 'コメントの投稿に失敗しました',
            color: 'error'
          })
        })
    },

    deleteComment(context, { spot, comment, type }) {
      const params = { id: comment.id }
      axiosBase
        .delete('/api/v1/comments/' + params.id, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          type === 'map'
            ? context.commit('spot/deleteData', {
                spot: spot,
                data: response.data,
                genre: 'comments'
              })
            : context.commit('user/deleteUserData', {
                spot: spot,
                data: response.data,
                type: type,
                genre: 'comments'
              })

          context.dispatch('pushSnackbar', {
            message: 'コメントを削除しました',
            color: 'success'
          })
        })
        .catch(() => {
          context.dispatch('pushSnackbar', {
            message: 'コメントの削除に失敗しました',
            color: 'error'
          })
        })
    }
  }
}
