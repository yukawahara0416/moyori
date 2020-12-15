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

    signInFormData: {
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

    signInFormData(state) {
      return state.signInFormData
    },

    signUpForm(state) {
      return state.signUpForm
    }
  },

  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser.data = payload
    },

    setCurrentUserAvatar(state, payload) {
      state.currentUser.data.avatar = payload
    },

    setHeaders(state, payload) {
      state.headers = {
        'access-token': payload['access-token'],
        'client': payload['client'], // eslint-disable-line
        'content-type': payload['content-type'],
        'uid': payload['uid'] // eslint-disable-line
      }
    },

    updateCurrentUser(state, { name, email }) {
      state.currentUser.data.name = name
      state.currentUser.data.email = email
    },

    clearSignUpForm(state) {
      state.signUpForm = {
        name: '',
        email: '',
        password: ''
      }
    },

    clearSignInFormData(state) {
      state.signInFormData = {
        email: '',
        password: ''
      }
    },

    clearHeaders(state) {
      state.headers = null
      state.currentUser = { data: {}, avatar: '' }
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

    signIn(context, signInFormData) {
      return axiosBase
        .post('/api/v1/auth/sign_in', signInFormData)
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

    updateAccount(context, { params, headers }) {
      return axiosBase
        .patch('/api/v1/auth/', params, { headers })
        .then(response => {
          return response
        })
        .catch(() => {
          throw new Error('アカウントの編集に失敗しました')
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
