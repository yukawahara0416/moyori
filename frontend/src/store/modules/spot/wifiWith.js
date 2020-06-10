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
          headers: context.rootState.userStore.headers
        })
        .then(function(response) {
          context.commit('addWifiWith', { wifiWith: response.data, id: id })
        })
    },

    unWifiWith(context, { params, id }) {
      axiosBase
        .delete('/api/v1/wifi_withs/' + params.id, {
          headers: context.rootState.userStore.headers
        })
        .then(function(response) {
          context.commit('deleteWifiWith', { wifiWith: response.data, id: id })
        })
    }
  }
}
