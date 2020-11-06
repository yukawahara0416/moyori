import { axiosBase } from '@/plugins/axios.js'
import router from '@/router'

export default {
  actions: {
    wifiWithout(context, { spot, active_tab }) {
      const params = { spot_id: spot.data.id }
      axiosBase
        .post('/api/v1/wifi_withouts', params, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          if (router.currentRoute.name == 'search')
            context.commit('spot/pushDataSpotsStore', {
              spot: spot,
              data: response.data,
              genre: 'wifi_withouts'
            })
          if (router.currentRoute.name == 'profile')
            context.commit('user/addDataUserStore', {
              spot: spot,
              data: response.data,
              active_tab: active_tab,
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

    unWifiWithout(context, { spot, wifi_without, active_tab }) {
      const params = { id: wifi_without.id }
      axiosBase
        .delete('/api/v1/wifi_withouts/' + params.id, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          if (router.currentRoute.name == 'search')
            context.commit('spot/deleteDataSpotsStore', {
              spot: spot,
              data: response.data,
              genre: 'wifi_withouts'
            })
          if (router.currentRoute.name == 'profile')
            context.commit('user/deleteDataUserStore', {
              spot: spot,
              data: response.data,
              active_tab: active_tab,
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
