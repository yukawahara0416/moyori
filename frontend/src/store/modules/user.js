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

    headers(state) {
      return state.headers
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
          context.dispatch('pushSnackbar', {
            message: 'MoYoRiへようこそ！',
            color: 'success'
          })
        })
        .catch(function(error) {
          context.commit('setCurrentUser', { user: error })
          context.dispatch('pushSnackbar', {
            message: 'アカウント作成に失敗しました',
            color: 'error'
          })
        })
    },

    signIn(context, signInFormData) {
      if (context.state.currentUser === null) {
        axiosBase
          .post('/api/v1/auth/sign_in', signInFormData)
          .then(function(response) {
            context.commit('setCurrentUser', { user: response.data })
            context.commit('signIn', response.headers)
            context.dispatch('pushSnackbar', {
              message: 'ログインしました',
              color: 'success'
            })
          })
          .catch(function(error) {
            context.commit('setCurrentUser', { user: error })
            context.dispatch('pushSnackbar', {
              message: 'ログインに失敗しました',
              color: 'error'
            })
          })
      } else {
        context.dispatch('pushSnackbar', {
          message: 'すでにログイン中です',
          color: 'error'
        })
      }
    },

    signOut(context) {
      axiosBase
        .delete('api/v1/auth/sign_out', {
          headers: context.state.headers
        })
        .then(function() {
          context.commit('signOut')
          context.dispatch('pushSnackbar', {
            message: 'ログアウトしました',
            color: 'success'
          })
        })
        .catch(function() {
          this.$store.dispatch('pushSnackbar', {
            message: '予期しないエラーが発生しました',
            color: 'error'
          })
        })
    }
  }
}
