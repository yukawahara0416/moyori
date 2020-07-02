import axios from 'axios'

const axiosBase = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'
})

export default {
  actions: {
    postComment(context, { params, id }) {
      axiosBase
        .post('/api/v1/comments', params, {
          headers: context.rootState.auth.headers
        })
        .then(function(response) {
          context.commit('addSpotData', {
            data: response.data,
            id: id,
            key: 'comments'
          })
          context.dispatch('pushSnackbar', {
            message: 'コメントを投稿しました',
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

    deleteComment(context, { comment, id }) {
      axiosBase
        .delete('/api/v1/comments/' + comment.id, {
          headers: context.rootState.auth.headers
        })
        .then(function(response) {
          context.commit('deleteData', {
            data: response.data,
            id: id,
            key: 'comments'
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
