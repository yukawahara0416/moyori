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

  it('signUpFormData', () => {
    const signUpFormData = { name: 'test', email: 'test', password: 'test' }
    store.replaceState({ signUpFormData: signUpFormData })
    expect(store.getters.signUpFormData).toMatchObject(signUpFormData)
  })
})

describe('mutations', () => {
  it('setCurrentUser', () => {
    const currentUser = { data: { id: 1 } }
    store.commit('setCurrentUser', currentUser)
    expect(store.state.currentUser.data).toMatchObject(currentUser)
  })

  it('editCurrentUser', () => {
    const name = 'update'
    const email = 'update'
    store.commit('editCurrentUser', { name, email })
    expect(store.state.currentUser.data.name).toEqual(name)
    expect(store.state.currentUser.data.email).toEqual(email)
  })

  it('editCurrentUserAvatar', () => {
    const avatar = 'test'
    store.commit('editCurrentUserAvatar', avatar)
    expect(store.state.currentUser.data.avatar).toEqual(avatar)
  })

  it('clearSignUpFormData', () => {})
  it('clearSignInFormData', () => {})
  it('signIn', () => {})
  it('signOut', () => {})
})

describe('actions', () => {
  it('signUp', () => {})
  it('signIn', () => {})
  it('signOut', () => {})
  it('updateAccount', () => {})
  it('deleteAccount', () => {})
  it('editAvatar', () => {})
  it('clearSignFormData', () => {})
})
