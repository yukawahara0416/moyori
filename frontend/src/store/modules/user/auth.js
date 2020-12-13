import { axiosBase } from '@/plugins/axios.js'
import router from '@/router'

export default {
  state: {
    currentUser: { data: {}, avatar: '' },

    headers: null,

    signUpFormData: {
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

    signUpFormData(state) {
      return state.signUpFormData
    }
  },

  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser.data = payload
    },

    editCurrentUser(state, { name, email }) {
      state.currentUser.data.name = name
      state.currentUser.data.email = email
    },

    editCurrentUserAvatar(state, payload) {
      state.currentUser.data.avatar = payload
    },

    clearSignUpFormData(state) {
      state.signUpFormData = {
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

    setHeaders(state, payload) {
      state.headers = {
        'access-token': payload['access-token'],
        'client': payload['client'], // eslint-disable-line
        'content-type': payload['content-type'],
        'uid': payload['uid'] // eslint-disable-line
      }
    },

    clearHeaders(state) {
      state.headers = null
      state.currentUser = { data: {}, avatar: '' }
    }
  },

  actions: {
    signUp(context, signUpFormData) {
      return axiosBase
        .post('/api/v1/auth/', signUpFormData)
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
          // const user = response.data.data

          // context.dispatch('editAvatar', user.id)
          // context.commit('user/editUserStore', {
          //   name: user.name,
          //   email: user.email
          // })
        })
        .catch(() => {
          throw new Error('アカウントの編集に失敗しました')
        })
    },

    deleteAccount(context, headers) {
      axiosBase
        .delete('/api/v1/auth', { headers })
        .then(() => {
          context.commit('clearHeaders')
          router.push('/')
        })
        .catch(() => {
          throw new Error('アカウントの削除に失敗しました')
        })
    },

    editAvatar(context, userId) {
      axiosBase.get('/api/v1/users/' + userId).then(response => {
        const avatar = response.data.avatar

        context.commit('editCurrentUserAvatar', avatar)
        context.commit('user/editUserAvatarStore', avatar)
      })
    },

    clearSignFormData(context) {
      context.commit('clearSignInFormData')
      context.commit('clearSignUpFormData')
    }
  }
}
