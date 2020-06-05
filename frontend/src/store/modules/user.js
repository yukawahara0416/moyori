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
  state: {
    currentUser: null,
    headers: null,
    signInFormData: {
      email: '',
      password: ''
    },
    signUpFormData: {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  },

  getters: {
    currentUser(state) {
      return state.currentUser
    },

    signInFormData(state) {
      return state.signInFormData
    },

    signUpFormData(state) {
      return state.signUpFormData
    }
  },

  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload.user
    },

    setSignInFormData(state, payload) {
      state.headers = {
        'access-token': payload['access-token'],
        client: payload['client'],
        'content-type': payload['content-type'],
        uid: payload['uid']
      }
    },

    signIn(state, payload) {
      state.headers = {
        'access-token': payload['access-token'],
        client: payload['client'],
        'content-type': payload['content-type'],
        uid: payload['uid']
      }
    },

    signOut(state) {
      state.headers = null
      state.currentUser = null
    }
  },
  actions: {
    signUp(context, signUpFormData) {
      axiosBase
        .post('/api/v1/auth/', signUpFormData)
        .then(function(response) {
          context.commit('setCurrentUser', { user: response.data })
          context.commit('signIn', response.headers)
        })
        .catch(function(error) {
          context.commit('setCurrentUser', { user: error })
        })
    },

    signIn(context, signInFormData) {
      axiosBase
        .post('/api/v1/auth/sign_in', signInFormData)
        .then(function(response) {
          context.commit('setCurrentUser', { user: response.data })
          context.commit('signIn', response.headers)
        })
        .catch(function(error) {
          context.commit('setCurrentUser', { user: error })
        })
    },

    signOut(context) {
      axiosBase
        .delete('api/v1/auth/sign_out', {
          headers: context.state.headers
        })
        .then(function() {
          context.commit('signOut')
        })
        .catch(function() {
          alert('予期しないエラーが発生しました。')
        })
    }
  }
}
