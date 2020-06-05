import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import SignUp from '@/components/SignUp.vue'
import userStore from '@/store/modules/user.js'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let state
let actions

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
      userStore: {
        state,
        getters: userStore.getters,
        actions
      }
    }
  })

  wrapper = shallowMount(SignUp, {
    localVue,
    store
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  it('signUp', () => {
    const event = jest.fn()
    wrapper.setMethods({ signUp: event })
    wrapper.findAll('[data-test="signup"]').trigger('click')
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
