import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignContainerTabItemsSignUp.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let getters
let actions
let store

beforeEach(() => {
  getters = {
    signUpFormData: () => ({
      name: 'tester',
      email: 'tester@example.com',
      password: 'password',
      password_confirmation: 'password'
    }),
    currentUser: () => ({ data: { id: 1 } })
  }

  actions = {
    signUp: jest.fn()
  }

  store = new Vuex.Store({
    getters,
    actions
  })

  wrapper = mount(Component, {
    localVue,
    store,
    stubs: ['policy']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('getters', () => {
  it('signUpFormData', () => {
    expect(wrapper.vm.signUpFormData).toEqual(getters.signUpFormData())
  })
  it('currentUser', () => {
    expect(wrapper.vm.currentUser).toEqual(getters.currentUser())
  })
})

describe('v-on', () => {
  it('signUp', () => {
    const event = jest.fn()
    wrapper.setMethods({ signUp: event })
    wrapper.find('.v-btn').trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('actions', () => {
  it('signUp', () => {
    wrapper.vm.signUp()
    expect(actions.signUp).toHaveBeenCalled()
    // expect(actions.signUp).toHaveBeenCalledWith(
    //   expect.any(Object),
    //   getters.signUpFormData,
    //   undefined
    // )
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
