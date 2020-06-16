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
    like(context, { params, id }) {
      axiosBase
        .post('/api/v1/likes', params, {
          headers: context.rootState.userStore.headers
        })
        .then(function(response) {
          context.commit('addData', {
            data: response.data,
            id: id,
            key: 'likes'
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

    unlike(context, { params, id }) {
      axiosBase
        .delete('/api/v1/likes/' + params.id, {
          headers: context.rootState.userStore.headers
        })
        .then(function(response) {
          context.commit('deleteData', {
            data: response.data,
            id: id,
            key: 'likes'
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
