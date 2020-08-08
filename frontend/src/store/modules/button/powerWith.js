import { axiosBase } from '@/plugins/axios.js'

export default {
  actions: {
    powerWith(context, { spot, type }) {
      const params = { spot_id: spot.data.id }
      axiosBase
        .post('/api/v1/power_withs', params, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          type === 'map'
            ? context.commit('spot/pushData', {
                spot: spot,
                data: response.data,
                genre: 'power_withs'
              })
            : context.commit('user/addUserData', {
                spot: spot,
                data: response.data,
                type: type,
                genre: 'power_withs'
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

    unPowerWith(context, { spot, power_with, type }) {
      var params = { id: power_with.id }
      axiosBase
        .delete('/api/v1/power_withs/' + params.id, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          type === 'map'
            ? context.commit('spot/deleteData', {
                spot: spot,
                data: response.data,
                genre: 'power_withs'
              })
            : context.commit('user/deleteUserData', {
                spot: spot,
                data: response.data,
                type: type,
                genre: 'power_withs'
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
