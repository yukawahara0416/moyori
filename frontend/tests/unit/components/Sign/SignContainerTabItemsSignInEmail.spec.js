import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignContainerTabItemsSignInEasy.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth

const signInHandler = jest.fn()

beforeEach(() => {
  auth = {
    getters: {
      isLoggingIn: () => true,
      signInForm: () => {
        return { email: 'test@expample.com', password: 'password' }
      }
    }
  }

  store = new Vuex.Store({
    modules: {
      auth
    }
  })

  wrapper = mount(Component, {
    localVue,
    store,
    methods: {
      signInHandler
    }
  })
})

describe('getters', () => {})
