import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import auth from '@/store/modules/user/auth.js'
import { cloneDeep } from 'lodash'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axiosBase)

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(auth))
})

describe('getters', () => {
  it('currentUser', () => {})
  it('headers', () => {})
  it('isLoggingIn', () => {})
  it('signInFormData', () => {})
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
