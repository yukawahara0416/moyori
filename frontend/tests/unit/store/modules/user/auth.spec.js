import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import auth from '@/store/modules/user/auth.js'
import cloneDeep from 'lodash/cloneDeep'
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
    store.replaceState({ currentUser })
    expect(store.getters.currentUser).toMatchObject(currentUser)
  })

  it('headers', () => {
    const headers = { 'access-token': 'test' }
    store.replaceState({ headers })
    expect(store.getters.headers).toMatchObject(headers)
  })

  it('isLoggingIn is true', () => {
    const headers = { 'access-token': 'test' }
    store.replaceState({ headers })
    expect(store.getters.isLoggingIn).toBeTruthy()
  })

  it('isLoggingIn is false', () => {
    const headers = null
    store.replaceState({ headers })
    expect(store.getters.isLoggingIn).toBeFalsy()
  })

  it('signInForm', () => {
    const signInForm = { email: 'test', password: 'test' }
    store.replaceState({ signInForm })
    expect(store.getters.signInForm).toMatchObject(signInForm)
  })

  it('signUpForm', () => {
    const signUpForm = { name: 'test', email: 'test', password: 'test' }
    store.replaceState({ signUpForm })
    expect(store.getters.signUpForm).toMatchObject(signUpForm)
  })
})

describe('mutations', () => {
  it('setCurrentUser', () => {
    const currentUser = { data: { id: 1 } }
    store.commit('setCurrentUser', currentUser)
    expect(store.state.currentUser.data).toMatchObject(currentUser)
  })

  it('setHeaders', () => {
    const headers = { 'access-token': 'test' }
    store.commit('setHeaders', headers)
    expect(store.state.headers).toMatchObject(headers)
  })

  it('updateCurrentUser', () => {
    const name = 'update'
    const email = 'update'
    const avatar = 'update'
    store.commit('updateCurrentUser', { name, email, avatar })
    expect(store.state.currentUser.data.name).toEqual(name)
    expect(store.state.currentUser.data.email).toEqual(email)
    expect(store.state.currentUser.data.avatar).toEqual(avatar)
  })

  it('clearSignUpForm', () => {
    const signUpForm = { name: 'test', email: 'test', password: 'test' }
    store.replaceState({ signUpForm })
    store.commit('clearSignUpForm')
    expect(store.state.signUpForm).toMatchObject({
      name: '',
      email: '',
      password: ''
    })
  })

  it('clearSignInForm', () => {
    const signInForm = { email: 'test', password: 'test' }
    store.replaceState({ signInForm })
    store.commit('clearSignInForm')
    expect(store.state.signInForm).toMatchObject({
      email: '',
      password: ''
    })
  })

  it('clearHeaders', () => {
    const headers = { 'access-token': 'test' }
    const currentUser = { data: { id: 1 } }
    store.replaceState({ headers, currentUser })
    store.commit('clearHeaders')
    expect(store.state.headers).toBeNull()
    expect(store.state.currentUser).toMatchObject({ data: {} })
  })
})

describe('actions', () => {
  it('signUp', () => {
    const signUpForm = {
      name: 'test',
      email: 'test',
      password: 'test'
    }
    const response = { id: 1 }
    axiosMock.onPost('/api/v1/auth/', signUpForm).reply(200, response)

    store.dispatch('signUp', signUpForm).then(res => {
      expect(res.data).toMatchObject(response)
    })
  })

  it('signUp 404 error', () => {
    const signUpForm = {
      name: 'test',
      email: 'test',
      password: 'test'
    }
    axiosMock.onPost('/api/v1/auth/', signUpForm).reply(404)

    store.dispatch('signUp', signUpForm).catch(err => {
      expect(err).toStrictEqual(new Error('アカウント作成に失敗しました'))
    })
  })

  it('signIn', () => {
    const signInForm = {
      email: 'test',
      password: 'test'
    }
    const response = { id: 1 }
    axiosMock.onPost('/api/v1/auth/sign_in', signInForm).reply(200, response)

    store.dispatch('signIn', signInForm).then(res => {
      expect(res.data).toMatchObject(response)
    })
  })

  it('signIn 404 error', () => {
    const signInForm = {
      email: 'test',
      password: 'test'
    }
    axiosMock.onPost('/api/v1/auth/sign_in', signInForm).reply(404)

    store.dispatch('signIn', signInForm).catch(err => {
      expect(err).toStrictEqual(new Error('ログインに失敗しました'))
    })
  })

  it('signOut', () => {
    const headers = { test: 'test' }
    const response = { id: 1 }
    axiosMock.onDelete('api/v1/auth/sign_out', { headers }).reply(200, response)

    store.dispatch('signOut').then(res => {
      expect(res.data).toMatchObject(response)
    })
  })

  it('signOut 404 error', () => {
    const headers = { test: 'test' }
    axiosMock.onDelete('api/v1/auth/sign_out', { headers }).reply(404)

    store.dispatch('signOut').catch(err => {
      expect(err).toStrictEqual(new Error('ログアウトに失敗しました'))
    })
  })
})
