import { axiosBase } from '@/plugins/axios.js'

export default {
  actions: {
    powerWith(context, { spot, id, type }) {
      const params = { spot_id: spot.data.id }
      axiosBase
        .post('/api/v1/power_withs', params, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          type === 'map'
            ? context.commit('addSpotData', {
                data: response.data,
                id: id,
                key: 'power_withs'
              })
            : context.commit('user/addUserData', {
                data: response.data,
                id: id,
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

    unPowerWith(context, { params, id }) {
      axiosBase
        .delete('/api/v1/power_withs/' + params.id, {
          headers: context.rootState.auth.headers
        })
        .then(response => {
          type === 'map'
            ? context.commit('deleteData', {
                data: response.data,
                id: id,
                key: 'power_withs'
              })
            : context.commit('user/deleteUserData', {
                data: response.data,
                id: id,
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
