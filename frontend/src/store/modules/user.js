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
  mutations: {},
  actions: {}
}
