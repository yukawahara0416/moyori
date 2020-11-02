import { axiosBase } from '@/plugins/axios.js'
import router from '@/router'

export default {
  state: {
    currentUser: null,
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

    signInFormData(state) {
      return state.signInFormData
    },

    signUpFormData(state) {
      return state.signUpFormData
    }
  },

  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload
      state.currentUser['avatar'] = null
    },

    editCurrentUser(state, { name, email }) {
      state.currentUser.data.name = name
      state.currentUser.data.email = email
    },

    editCurrentUserAvatar(state, payload) {
      state.currentUser.avatar = payload
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

    signIn(state, payload) {
      state.headers = {
        'access-token': payload['access-token'],
        'client': payload['client'], // eslint-disable-line
        'content-type': payload['content-type'],
        'uid': payload['uid'] // eslint-disable-line
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
        .then(response => {
          context.commit('setCurrentUser', response.data)
          context.dispatch('editAvatar', response.data.data.id)
          context.commit('signIn', response.headers)
          context.commit('dialogOff', 'dialogSign')
          context.commit('clearSignInFormData')
          context.commit('clearSignUpFormData')
          context.dispatch('pushSnackbar', {
            message: 'アカウントを登録しました。MoYoRiへようこそ！',
            color: 'success'
          })
        })
        .catch(() => {
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
          .then(response => {
            context.commit('setCurrentUser', response.data)
            context.dispatch('editAvatar', response.data.data.id)
            context.commit('signIn', response.headers)
            context.commit('dialogOff', 'dialogSign')
            context.commit('clearSignInFormData')
            context.commit('clearSignUpFormData')
            context.dispatch('pushSnackbar', {
              message: 'ログインしました',
              color: 'success'
            })
          })
          .catch(() => {
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
        .then(() => {
          context.commit('signOut')
          context.dispatch('pushSnackbar', {
            message: 'ログアウトしました',
            color: 'success'
          })
        })
        .catch(() => {
          this.$store.dispatch('pushSnackbar', {
            message: '予期しないエラーが発生しました',
            color: 'error'
          })
        })
    },

    updateAccount(context, { formData, id }) {
      axiosBase
        .patch('/api/v1/auth/', formData, {
          headers: context.state.headers
        })
        .then(response => {
          context.dispatch('editAvatar', id)
          context.commit('user/editUserStore', {
            name: response.data.data.name,
            email: response.data.data.email
          })
          context.dispatch('pushSnackbar', {
            message: 'アカウントを編集しました',
            color: 'success'
          })
        })
        .catch(() => {
          context.dispatch('pushSnackbar', {
            message: '予期しないエラーが発生しました',
            color: 'error'
          })
        })
    },

    deleteAccount(context) {
      axiosBase
        .delete('/api/v1/auth', { headers: context.state.headers })
        .then(() => {
          context.commit('signOut')
          context.dispatch('pushSnackbar', {
            message: 'アカウントを削除しました',
            color: 'success'
          })
          router.push('/')
        })
        .catch(() => {
          context.dispatch('pushSnackbar', {
            message: '予期しないエラーが発生しました',
            color: 'error'
          })
        })
    },

    editAvatar(context, id) {
      axiosBase.get('/api/v1/users/' + id).then(response => {
        context.commit('editCurrentUserAvatar', response.data.avatar)
        context.commit('user/editUserAvatarStore', response.data.avatar)
      })
    }
  }
}
