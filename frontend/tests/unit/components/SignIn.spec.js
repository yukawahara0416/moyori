import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import SignIn from '@/components/SignIn.vue'
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
    signInFormData: {
      email: 'hoge@example.com',
      password: 'password'
    }
  }

  actions = {
    signIn: jest.fn()
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

  wrapper = shallowMount(SignIn, {
    localVue,
    store
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  it('signIp', () => {
    const event = jest.fn()
    wrapper.setMethods({ signIn: event })
    wrapper.findAll('[data-test="signin"]').trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('getters', () => {
  it('signInFormData', () => {
    expect(wrapper.vm.signInFormData).toEqual(state.signInFormData)
  })

  it('currentUser', () => {})
})

describe('actions', () => {
  it('signIn', () => {
    wrapper.vm.signIn()
    expect(actions.signIn).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
