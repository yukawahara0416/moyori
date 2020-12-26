import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignTabitemsSigninEmail.vue'

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
    },
    stubs: ['ValidationObserver']
  })
})

describe('getters', () => {
  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toBe(store.getters.isLoggingIn)
  })

  it('signInForm', () => {
    expect(wrapper.vm.signInForm).toMatchObject(store.getters.signInForm)
  })
})

describe('v-on', () => {})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
