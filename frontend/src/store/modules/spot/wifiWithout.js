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
    wifiWithout(context, { params, id }) {
      axiosBase
        .post('/api/v1/wifi_withouts', params, {
          headers: context.rootState.userStore.headers
        })
        .then(function(response) {
          context.commit('addData', {
            data: response.data,
            id: id,
            key: 'wifi_withouts'
          })
        })
    },

    unWifiWithout(context, { params, id }) {
      axiosBase
        .delete('/api/v1/wifi_withouts/' + params.id, {
          headers: context.rootState.userStore.headers
        })
        .then(function(response) {
          context.commit('deleteData', {
            data: response.data,
            id: id,
            key: 'wifi_withouts'
          })
        })
    }
  }
}
