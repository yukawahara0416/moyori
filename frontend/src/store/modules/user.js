import axios from 'axios'

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
    currentUser(state, payload) {
      state.currentUser = payload.user
    },
    signInFormData(state, payload) {
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
    signUp(content, signUpFormData) {
      axios
        .post('/api/v1/auth', signUpFormData)
        .then(function(response) {
          content.commit('currentUser', { user: response.data })
          content.commit('signIn', response.headers)
        })
        .catch(function(error) {
          context.commit('currentUser', { user: error })
        })
    },

    signOut(context) {
      axios
        .delete('/api/v1/auth/sign_out', { headers: context.state.headers })
        .then(function() {
          context.commit('signOut')
        })
        .catch(function(error) {
          alert('予期しないエラーが発生しました。')
        })
    }
  }
}
