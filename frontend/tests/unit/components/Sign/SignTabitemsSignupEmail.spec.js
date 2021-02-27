import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import Component from '@/components/Sign/SignTabitemsSignupEmail.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)

const {
  required,
  email,
  max,
  min,
  alpha_num
} = require('vee-validate/dist/rules.umd')
extend('required', required)
extend('email', email)
extend('max', max)
extend('min', min)
extend('alpha_num', alpha_num)

let wrapper
let store
let auth
let dialog
let snackbar

beforeEach(() => {
  auth = {
    getters: {
      signUpForm: () => {
        return { name: 'name', email: 'test@example.com', password: 'password' }
      }
    },
    mutations: {
      setCurrentUser: jest.fn(),
      setHeaders: jest.fn(),
      clearSignInForm: jest.fn(),
      clearSignUpForm: jest.fn()
    },
    actions: {
      signUp: jest
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
  it('signUpForm', () => {
    expect(wrapper.vm.signUpForm).toMatchObject(store.getters.signUpForm)
  })
})

describe('v-on', () => {
  const signUpHandler = jest.fn()
  const changeSignTab = jest.fn()

  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      store,
      methods: {
        signUpHandler,
        changeSignTab
      }
    })
  })

  it('keyup.enter signUp', () => {
    wrapper
      .findAll('input')
      .at(2)
      .trigger('keyup.enter')
    expect(auth.actions.signUp).toHaveBeenCalled()
  })

  it('click signUpHandler', () => {
    wrapper
      .findAll('.v-btn')
      .at(0)
      .trigger('click')
    expect(signUpHandler).toHaveBeenCalled()
  })

})
describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
