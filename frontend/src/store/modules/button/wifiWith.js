import { axiosBase } from '@/plugins/axios.js'
import router from '@/router'

export default {
  actions: {
    wifiWith(context, { spot, active_tab }) {
      axiosBase
        .post(
          '/api/v1/wifi_withs',
          { spot_id: spot.data.id },
          {
            headers: context.rootState.auth.headers
          }
        )
        .then(response => {
          if (router.currentRoute.name == 'search')
            context.commit('spot/pushDataSpotsStore', {
              spot: spot,
              data: response.data,
              genre: 'wifi_withs'
            })
          if (router.currentRoute.name == 'profile')
            context.commit('user/addDataUserStore', {
              spot: spot,
              data: response.data,
              active_tab: active_tab,
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

    unWifiWith(context, { spot, wifi_with, active_tab }) {
      axiosBase
        .delete('/api/v1/wifi_withs/' + wifi_with.id, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          if (router.currentRoute.name == 'search')
            context.commit('spot/deleteDataSpotsStore', {
              spot: spot,
              data: response.data,
              genre: 'wifi_withs'
            })
          if (router.currentRoute.name == 'profile')
            context.commit('user/deleteDataUserStore', {
              spot: spot,
              data: response.data,
              active_tab: active_tab,
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
