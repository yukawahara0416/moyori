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
    powerWith(context, { params, id }) {
      axiosBase
        .post('/api/v1/power_withs', params, {
          headers: context.rootState.userStore.headers
        })
        .then(function(response) {
          context.commit('addPowerWith', { powerWith: response.data, id: id })
        })
    },

    unPowerWith(context, { params, id }) {
      axiosBase
        .delete('/api/v1/power_withs/' + params.id, {
          headers: context.rootState.userStore.headers
        })
        .then(function(response) {
          context.commit('deletePowerWith', {
            powerWith: response.data,
            id: id
          })
        })
    }
  }
}
