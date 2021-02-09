import { axiosBase } from '@/plugins/axios.js'

export default {
  state: {
    currentUser: { data: {} },

    headers: null,

    signUpForm: {
      name: '',
      email: '',
      password: ''
    },

    signInForm: {
      email: '',
      password: ''
    }
  },

  getters: {
    currentUser(state) {
      return state.currentUser
    },

    headers(state) {
      return state.headers
    },

    isLoggingIn(state) {
      return state.headers == null ? false : true
    },

    signInForm(state) {
      return state.signInForm
    },

    signUpForm(state) {
      return state.signUpForm
    }
  },

  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser.data = payload
    },

    setHeaders(state, payload) {
      state.headers = {
        'access-token': payload['access-token'],
        'client': payload['client'], // eslint-disable-line
        'content-type': payload['content-type'],
        'uid': payload['uid'] // eslint-disable-line
      }
    },

    updateCurrentUser(state, { name, email, avatar }) {
      state.currentUser.data.name = name
      state.currentUser.data.email = email
      state.currentUser.data.avatar = avatar
    },

    clearSignUpForm(state) {
      state.signUpForm = {
        name: '',
        email: '',
        password: ''
      }
    },

    clearSignInForm(state) {
      state.signInForm = {
        email: '',
        password: ''
      }
    },

    clearHeaders(state) {
      state.headers = null
      state.currentUser = { data: {} }
    }
  },

  actions: {
    signUp(context, signUpForm) {
      return axiosBase
        .post('/api/v1/auth/', signUpForm)
        .then(response => {
          return response
        })
        .catch(() => {
          throw new Error('アカウント作成に失敗しました')
        })
    },

    signIn(context, signInForm) {
      return axiosBase
        .post('/api/v1/auth/sign_in', signInForm)
        .then(response => {
          return response
        })
        .catch(() => {
          throw new Error('ログインに失敗しました')
        })
    },

    signOut(context, headers) {
      return axiosBase
        .delete('api/v1/auth/sign_out', { headers })
        .then(response => {
          return response
        })
        .catch(() => {
          throw new Error('ログアウトに失敗しました')
        })
    },

    deleteAccount(context, headers) {
      return axiosBase
        .delete('/api/v1/auth/', { headers })
        .then(response => {
          return response
        })
        .catch(() => {
          throw new Error('アカウントの削除に失敗しました')
        })
    }
  }
}
