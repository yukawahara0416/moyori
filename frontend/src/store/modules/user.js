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
  actions: {}
}
