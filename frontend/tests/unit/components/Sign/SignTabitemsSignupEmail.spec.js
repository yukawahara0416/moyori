import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
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

  it('click changeSignTab', () => {
    wrapper
      .findAll('.v-btn')
      .at(1)
      .trigger('click')
    expect(changeSignTab).toHaveBeenCalledWith('signin')
  })
})

describe('methods', () => {
  it('signUpHandler', () => {
    const signUpForm = {
      name: 'name',
      email: 'test@example.com',
      password: 'password'
    }
    const currentUser = { id: 1 }
    const headers = { id: 1 }

    expect.assertions(8)

    return wrapper.vm.signUpHandler().then(() => {
      expect(auth.actions.signUp).toHaveBeenCalledWith(
        expect.any(Object),
        signUpForm
      )
      expect(auth.mutations.setCurrentUser).toHaveBeenCalledWith(
        expect.any(Object),
        currentUser
      )
      expect(auth.mutations.setHeaders).toHaveBeenCalledWith(
        expect.any(Object),
        headers
      )
      expect(dialog.actions.dialogOff).toHaveBeenCalledWith(
        expect.any(Object),
        'dialogSign'
      )
      expect(auth.mutations.clearSignInForm).toHaveBeenCalled()
      expect(auth.mutations.clearSignUpForm).toHaveBeenCalled()
      expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
        expect.any(Object),
        {
          message: 'アカウントを登録しました。MoYoRiへようこそ！'
        }
      )
      expect(snackbar.actions.pushSnackbarError).not.toHaveBeenCalled()
    })
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
