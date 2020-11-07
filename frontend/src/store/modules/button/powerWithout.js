import { axiosBase } from '@/plugins/axios.js'
import router from '@/router'

export default {
  actions: {
    powerWithout(context, { spot, active_tab }) {
      axiosBase
        .post(
          '/api/v1/power_withouts',
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
              genre: 'power_withouts'
            })

          if (router.currentRoute.name == 'profile')
            context.commit('user/addDataUserStore', {
              spot: spot,
              data: response.data,
              active_tab: active_tab,
              genre: 'power_withouts'
            })

          context.dispatch('pushSnackbar', {
            message: '「電源ないよ」しました　投票ありがとうございます！',
            color: 'success'
          })
        })
        .catch(() => {
          context.dispatch('pushSnackbar', {
            message: '「電源ないよ」に失敗しました',
            color: 'error'
          })
        })
    },

    unPowerWithout(context, { spot, power_without, active_tab }) {
      axiosBase
        .delete('/api/v1/power_withouts/' + power_without.id, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          if (router.currentRoute.name == 'search')
            context.commit('spot/deleteDataSpotsStore', {
              spot: spot,
              data: response.data,
              genre: 'power_withouts'
            })

          if (router.currentRoute.name == 'profile')
            context.commit('user/deleteDataUserStore', {
              spot: spot,
              data: response.data,
              active_tab: active_tab,
              genre: 'wifi_withouts'
            })

          context.dispatch('pushSnackbar', {
            message: '「電源ないよ」を取り消しました',
            color: 'success'
          })
        })
        .catch(() => {
          context.dispatch('pushSnackbar', {
            message: '「電源ないよ」の取り消しに失敗しました',
            color: 'error'
          })
        })
    }
  }
}
