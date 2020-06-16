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
    powerWith(context, { params, id }) {
      axiosBase
        .post('/api/v1/power_withs', params, {
          headers: context.rootState.userStore.headers
        })
        .then(function(response) {
          context.commit('addData', {
            data: response.data,
            id: id,
            key: 'power_withs'
          })
          context.dispatch('pushSnackbar', {
            message: '「電源あるよ」しました　投票ありがとうございます！',
            color: 'success'
          })
        })
        .catch(() => {
          context.dispatch('pushSnackbar', {
            message: '「電源あるよ」に失敗しました',
            color: 'error'
          })
        })
    },

    unPowerWith(context, { params, id }) {
      axiosBase
        .delete('/api/v1/power_withs/' + params.id, {
          headers: context.rootState.userStore.headers
        })
        .then(function(response) {
          context.commit('deleteData', {
            data: response.data,
            id: id,
            key: 'power_withs'
          })
          context.dispatch('pushSnackbar', {
            message: '「電源あるよ」を取り消しました',
            color: 'success'
          })
        })
        .catch(() => {
          context.dispatch('pushSnackbar', {
            message: '「電源あるよ」の取り消しに失敗しました',
            color: 'error'
          })
        })
    }
  }
}
