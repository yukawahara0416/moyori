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
          context.commit('addData', {
            data: response.data,
            id: id,
            key: 'wifi_withs'
          })
        })
    },

    unWifiWith(context, { params, id }) {
      axiosBase
        .delete('/api/v1/wifi_withs/' + params.id, {
          headers: context.rootState.userStore.headers
        })
        .then(function(response) {
          context.commit('deleteData', {
            data: response.data,
            id: id,
            key: 'wifi_withs'
          })
        })
    }
  }
}
