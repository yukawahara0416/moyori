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
    wifiWith(context, { params, id }) {
      axiosBase
        .post('/api/v1/wifi_withs', params, {
          headers: context.rootState.auth.headers
        })
        .then(function(response) {
          context.commit('addSpotData', {
            data: response.data,
            id: id,
            key: 'wifi_withs'
          })
          context.dispatch('pushSnackbar', {
            message: '「WiFiあるよ」しました　投票ありがとうございます！',
            color: 'success'
          })
        })
        .catch(() => {
          context.dispatch('pushSnackbar', {
            message: '「WiFiあるよ」に失敗しました',
            color: 'error'
          })
        })
    },

    unWifiWith(context, { params, id }) {
      axiosBase
        .delete('/api/v1/wifi_withs/' + params.id, {
          headers: context.rootState.auth.headers
        })
        .then(function(response) {
          context.commit('deleteData', {
            data: response.data,
            id: id,
            key: 'wifi_withs'
          })
          context.dispatch('pushSnackbar', {
            message: '「WiFiあるよ」を取り消しました',
            color: 'success'
          })
        })
        .catch(() => {
          context.dispatch('pushSnackbar', {
            message: '「WiFiあるよ」の取り消しに失敗しました',
            color: 'error'
          })
        })
    }
  }
}
