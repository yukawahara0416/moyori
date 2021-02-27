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

beforeEach(() => {
  auth = {
    getters: {
      signUpForm: () => {
        return { name: 'test', email: 'test@example.com', password: 'passowrd' }
      }
    }
  }

  store = new Vuex.Store({
    modules: {
      auth
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    store,
    stubs: ['ValidationObserver']
  })
})

describe('getters', () => {
  it('signUpForm', () => {
    expect(wrapper.vm.signUpForm).toMatchObject(store.getters.signUpForm)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
