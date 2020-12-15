import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import auth from '@/store/modules/user/auth.js'
import { cloneDeep } from 'lodash'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axiosBase)
jest.mock('vue2-google-maps', () => 'vue2-google-maps')

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(auth))
})

describe('getters', () => {
  it('currentUser', () => {
    const currentUser = { data: { id: 1 } }
    store.replaceState({ currentUser: currentUser })
    expect(store.getters.currentUser).toMatchObject(currentUser)
  })

  it('headers', () => {
    const headers = { test: 'test' }
    store.replaceState({ headers: headers })
    expect(store.getters.headers).toMatchObject(headers)
  })

  it('isLoggingIn', () => {
    const headers = { test: 'test' }
    store.replaceState({ headers: headers })
    expect(store.getters.isLoggingIn).toBeTruthy()
  })

  it('signInFormData', () => {
    const signInFormData = { email: 'test', password: 'test' }
    store.replaceState({ signInFormData: signInFormData })
    expect(store.getters.signInFormData).toMatchObject(signInFormData)
  })

  it('signUpForm', () => {
    const signUpForm = { name: 'test', email: 'test', password: 'test' }
    store.replaceState({ signUpForm: signUpForm })
    expect(store.getters.signUpForm).toMatchObject(signUpForm)
  })
})

describe('mutations', () => {
  it('setCurrentUser', () => {
    const currentUser = { data: { id: 1 } }
    store.commit('setCurrentUser', currentUser)
    expect(store.state.currentUser.data).toMatchObject(currentUser)
  })

  it('updateCurrentUser', () => {
    const name = 'update'
    const email = 'update'
    store.commit('updateCurrentUser', { name, email })
    expect(store.state.currentUser.data.name).toEqual(name)
    expect(store.state.currentUser.data.email).toEqual(email)
  })

  it('setCurrentUserAvatar', () => {
    const avatar = 'test'
    store.commit('setCurrentUserAvatar', avatar)
    expect(store.state.currentUser.data.avatar).toEqual(avatar)
  })

  it('clearSignUpForm', () => {
    const signUpForm = { name: 'test', email: 'test', password: 'test' }
    store.replaceState({ signUpForm: signUpForm })
    store.commit('clearSignUpForm')
    expect(store.state.signUpForm).toMatchObject({
      name: '',
      email: '',
      password: ''
    })
  })

  it('clearSignInFormData', () => {
    const signInFormData = { email: 'test', password: 'test' }
    store.replaceState({ signInFormData: signInFormData })
    store.commit('clearSignInFormData')
    expect(store.state.signInFormData).toMatchObject({
      email: '',
      password: ''
    })
  })

  it('setHeaders', () => {
    const headers = {
      'access-token': 'test',
      'client': 'test', // eslint-disable-line
      'content-type': 'test',
      'uid': 'test' // eslint-disable-line
    }
    store.commit('setHeaders', headers)
    expect(store.state.headers).toMatchObject(headers)
  })

  it('clearHeaders', () => {
    const headers = { test: 'test' }
    const currentUser = { data: { test: 'test' }, avatar: 'test' }
    store.replaceState({ headers: headers, currentUser: currentUser })
    store.commit('clearHeaders')
    expect(store.state.headers).toBeNull()
    expect(store.state.currentUser).toMatchObject({ data: {}, avatar: '' })
  })
})

describe('actions', () => {
  it('signUp', () => {
    const signUpForm = {
      name: 'test',
      email: 'test',
      password: 'test'
    }
    const response = { data: { data: { id: 1 } } }

    axiosMock.onPost('/api/v1/auth/', signUpForm).reply(200, response)
    store.dispatch('signUp', signUpForm).then(res => {
      expect(res.data.data).toMatchObject(response.data)
    })
  })

  it('signIn', () => {
    const signInFormData = {
      email: 'test',
      password: 'test'
    }
    const response = { data: { data: { id: 1 } } }

    axiosMock
      .onPost('/api/v1/auth/sign_in', signInFormData)
      .reply(200, response)
    store.dispatch('signIn', signInFormData).then(res => {
      expect(res.data.data).toMatchObject(response.data)
    })
  })

  it('signOut', () => {
    const headers = { test: 'test' }
    const response = { data: { success: true } }

    axiosMock.onDelete('api/v1/auth/sign_out', { headers }).reply(200, response)
    store.dispatch('signOut').then(res => {
      expect(res.data.data).toMatchObject(response.data)
    })
  })

  it('updateAccount', () => {
    const params = { test: 'test' }
    const headers = { test: 'test' }
    const response = { data: { data: { id: 1 } } }

    axiosMock.onPatch('/api/v1/auth/', params).reply(200, response)
    store.dispatch('updateAccount', { params, headers }).then(res => {
      expect(res.data.data).toMatchObject(response.data)
    })
  })

  it('deleteAccount', () => {
    const headers = { test: 'test' }
    const response = { data: { data: { id: 1 } } }

    axiosMock.onDelete('/api/v1/auth/').reply(200, response)
    store.dispatch('deleteAccount', headers).then(res => {
      expect(res.data.data).toMatchObject(response.data)
    })
  })
})
