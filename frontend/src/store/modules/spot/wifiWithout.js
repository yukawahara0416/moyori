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
    wifiWithout(context, { params, id }) {
      axiosBase
        .post('/api/v1/wifi_withouts', params, {
          headers: context.rootState.userStore.headers
        })
        .then(function(response) {
          context.commit('addData', {
            data: response.data,
            id: id,
            key: 'wifi_withouts'
          })
          context.dispatch('pushSnackbar', {
            message: '「WiFiないよ」しました　投票ありがとうございます！',
            color: 'success'
          })
        })
        .catch(() => {
          context.dispatch('pushSnackbar', {
            message: '「WiFiないよ」に失敗しました',
            color: 'error'
          })
        })
    },

    unWifiWithout(context, { params, id }) {
      axiosBase
        .delete('/api/v1/wifi_withouts/' + params.id, {
          headers: context.rootState.userStore.headers
        })
        .then(function(response) {
          context.commit('deleteData', {
            data: response.data,
            id: id,
            key: 'wifi_withouts'
          })
          context.dispatch('pushSnackbar', {
            message: '「WiFiないよ」を取り消しました',
            color: 'success'
          })
        })
        .catch(() => {
          context.dispatch('pushSnackbar', {
            message: '「WiFiないよ」の取り消しに失敗しました',
            color: 'error'
          })
        })
    }
  }
}
