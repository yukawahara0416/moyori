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
    const signInFormData = { email: '', password: '' }
    store.replaceState({ signInFormData: signInFormData })
    expect(store.getters.signInFormData).toMatchObject(signInFormData)
  })
  it('signUpFormData', () => {})
})

describe('mutations', () => {
  it('setCurrentUser', () => {})
  it('editCurrentUser', () => {})
  it('editCurrentUserAvatar', () => {})
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
