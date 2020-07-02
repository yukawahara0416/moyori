import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import SignUp from '@/components/SignUp.vue'
import auth from '@/store/modules/auth.js'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

let wrapper
let store
let state
let actions
let vuetify

beforeEach(() => {
  state = {
    currentUser: {},
    signUpFormData: {
      name: 'hoge',
      email: 'hoge@example.com',
      password: 'password',
      password_confirmation: 'password'
    }
  }

  actions = {
    signUp: jest.fn()
  }

  store = new Vuex.Store({
    modules: {
      auth: {
        state,
        getters: auth.getters,
        actions
      }
    }
  })

  vuetify = new Vuetify()

  wrapper = mount(SignUp, {
    localVue,
    store,
    vuetify
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  it('signUp', () => {
    const event = jest.fn()
    wrapper.setMethods({ signUp: event })
    wrapper.findAll('.v-btn').trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('getters', () => {
  it('signUpFormData', () => {
    expect(wrapper.vm.signUpFormData).toEqual(state.signUpFormData)
  })

  it('currentUser', () => {})
})

describe('actions', () => {
  it('signUp', () => {
    wrapper.vm.signUp()
    expect(actions.signUp).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
