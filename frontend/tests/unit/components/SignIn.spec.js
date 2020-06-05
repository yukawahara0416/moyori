import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import SignIn from '@/components/SignIn.vue'
import userStore from '@/store/modules/user.js'

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

  vuetify = new Vuetify()

  wrapper = mount(SignIn, {
    localVue,
    store,
    vuetify
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  it('signIn', () => {
    const event = jest.fn()
    wrapper.setMethods({ signIn: event })
    wrapper
      .findAll('.v-btn')
      .at(0)
      .trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })

  it('signInAsTestUser', () => {
    const event = jest.fn()
    wrapper.setMethods({ signInAsTestUser: event })
    wrapper
      .findAll('.v-btn')
      .at(1)
      .trigger('click')
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
