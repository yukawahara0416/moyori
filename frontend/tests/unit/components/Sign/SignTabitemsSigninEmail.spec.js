import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import Component from '@/components/Sign/SignTabitemsSigninEmail.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)

const { required, email, max } = require('vee-validate/dist/rules.umd')
extend('required', required)
extend('email', email)
extend('max', max)

let wrapper
let store
let auth
let dialog
let snackbar

beforeEach(() => {
  auth = {
    getters: {
      isLoggingIn: () => true,
      signInForm: () => {
        return { email: 'test@expample.com', password: 'password' }
      }
    },
    mutations: {
      setCurrentUser: jest.fn(),
      setHeaders: jest.fn(),
      clearSignInForm: jest.fn(),
      clearSignUpForm: jest.fn()
    },
    actions: {
      signIn: jest
        .fn()
        .mockResolvedValue({ data: { data: { id: 1 } }, headers: { id: 1 } })
    }
  }

  dialog = {
    actions: {
      dialogOff: jest.fn()
    }
  }

  snackbar = {
    actions: {
      pushSnackbarSuccess: jest.fn(),
      pushSnackbarError: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      auth,
      dialog,
      snackbar
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    store
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

describe('v-on', () => {
  const signInHandler = jest.fn()
  const changeSignTab = jest.fn()

  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      store,
      methods: {
        signInHandler,
        changeSignTab
      }
    })
  })

  it('keyup.enter signInHandler', () => {
    wrapper
      .findAll('input')
      .at(1)
      .trigger('keyup.enter')
    expect(signInHandler).toHaveBeenCalled()
  })

  it('click signInHandler', () => {
    wrapper
      .findAll('.v-btn')
      .at(0)
      .trigger('click')
    expect(signInHandler).toHaveBeenCalled()
  })

})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
