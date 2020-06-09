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
    like(context, { params, id }) {
      axiosBase
        .post('/api/v1/likes', params, {
          headers: context.rootState.userStore.headers
        })
        .then(function(response) {
          context.commit('addLike', { like: response.data, id: id })
        })
    },


}
