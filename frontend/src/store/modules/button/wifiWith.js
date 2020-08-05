import { axiosBase } from '@/plugins/axios.js'

export default {
  actions: {
    wifiWith(context, { spot, id, type }) {
      var params = { spot_id: spot.data.id }
      axiosBase
        .post('/api/v1/wifi_withs', params, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          type === 'map'
            ? context.commit('spot/pushData', {
                data: response.data,
                id: id,
                genre: 'wifi_withs'
              })
            : context.commit('user/addUserData', {
                data: response.data,
                id: id,
                type: type,
                genre: 'wifi_withs'
              })

          context.dispatch('pushSnackbar', {
            message: '「Wifiあるよ」しました　投票ありがとうございます！',
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

    unWifiWith(context, { wifi_with, id, type }) {
      var params = { id: wifi_with.id }
      axiosBase
        .delete('/api/v1/wifi_withs/' + params.id, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          type === 'map'
            ? context.commit('spot/deleteData', {
                data: response.data,
                id: id,
                genre: 'wifi_withs'
              })
            : context.commit('user/deleteUserData', {
                data: response.data,
                id: id,
                type: type,
                genre: 'wifi_withs'
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
