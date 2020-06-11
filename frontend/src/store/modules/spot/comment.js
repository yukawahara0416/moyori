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
    postComment(context, { params, id }) {
      axiosBase
        .post('/api/v1/comments', params, {
          headers: context.rootState.userStore.headers
        })
        .then(function(response) {
          context.commit('addComment', { comment: response.data, id: id })
        })
    }
  }
}
