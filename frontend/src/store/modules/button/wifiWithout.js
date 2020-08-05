import { axiosBase } from '@/plugins/axios.js'

export default {
  actions: {
    wifiWithout(context, { spot, id, type }) {
      const params = { spot_id: spot.data.id }
      axiosBase
        .post('/api/v1/wifi_withouts', params, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          type === 'map'
            ? context.commit('spot/pushData', {
                data: response.data,
                id: id,
                genre: 'wifi_withouts'
              })
            : context.commit('user/addUserData', {
                data: response.data,
                id: id,
                type: type,
                genre: 'wifi_withouts'
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

    unWifiWithout(context, { wifi_without, id, type }) {
      var params = { id: wifi_without.id }
      axiosBase
        .delete('/api/v1/wifi_withouts/' + params.id, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          type === 'map'
            ? context.commit('spot/deleteData', {
                data: response.data,
                id: id,
                genre: 'wifi_withouts'
              })
            : context.commit('user/deleteUserData', {
                data: response.data,
                id: id,
                type: type,
                genre: 'wifi_withouts'
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
