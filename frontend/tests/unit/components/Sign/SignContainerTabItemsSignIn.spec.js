import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignContainerTabItemsSignIn.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let getters
let actions
let store

beforeEach(() => {
  getters = {
    signInFormData: () => ({
      email: 'tester@example.com',
      password: 'password'
    }),
    currentUser: () => ({ data: { id: 1 } }),
    headers: () => ({ uid: 'tester@example.com' })
  }

  actions = {
    signIn: jest.fn()
  }

  store = new Vuex.Store({
    getters,
    actions
  })

  wrapper = shallowMount(Component, {
    localVue,
    store,
    stubs: ['policy']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('getters', () => {
  it('signInFormData', () => {
    expect(wrapper.vm.signInFormData).toEqual(getters.signInFormData())
  })
  it('currentUser', () => {
    expect(wrapper.vm.currentUser).toEqual(getters.currentUser())
  })
  it('headers', () => {
    expect(wrapper.vm.headers).toEqual(getters.headers())
  })
})

describe('v-on', () => {
  it('signInAsTestUser', () => {
    const event = jest.fn()
    wrapper.setMethods({ signInAsTestUser: event })
    wrapper
      .findAll('.v-btn')
      .at(0)
      .trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
  it('signInByTwitter', () => {
    const event = jest.fn()
    wrapper.setMethods({ signIn: event })
    wrapper
      .findAll('.v-btn')
      .at(1)
      .trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
  it('signIn', () => {
    const event = jest.fn()
    wrapper.setMethods({ signIn: event })
    wrapper
      .findAll('.v-btn')
      .at(2)
      .trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('actions', () => {
  it('signIn', () => {
    wrapper.vm.signIn()
    expect(actions.signIn).toHaveBeenCalled()
  })
  // it('signInByTwitter', () => {
  //   wrapper.vm.signIn()
  //   expect(actions.signIn).toHaveBeenCalled()
  // })
  it('signInAsTestUser', () => {
    wrapper.vm.signInAsTestUser()
    expect(actions.signIn).toHaveBeenCalled()
    // expect(actions.signIn).toHaveBeenCalledWith(
    //   expect.any(Object),
    //   getters.signInFormData,
    //   undefined
    // )
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
