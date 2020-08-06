import { axiosBase } from '@/plugins/axios.js'

export default {
  actions: {
    powerWithout(context, { spot, id, type }) {
      const params = { spot_id: spot.data.id }
      axiosBase
        .post('/api/v1/power_withouts', params, {
          headers: context.rootState.auth.headers
        })
        .then(function(response) {
          context.commit('addSpotData', {
            data: response.data,
            id: id,
            key: 'power_withouts'
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

    unPowerWithout(context, { power_without, id, type }) {
      const params = { id: power_without.id }

      axiosBase
        .delete('/api/v1/power_withouts/' + params.id, {
          headers: context.rootState.auth.headers
        })
        .then(function(response) {
          context.commit('deleteData', {
            data: response.data,
            id: id,
            key: 'power_withouts'
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
