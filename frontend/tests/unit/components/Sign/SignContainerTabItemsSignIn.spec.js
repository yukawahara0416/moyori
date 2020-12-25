import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Sign/SignContainerTabItemsSignIn.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    localVue,
    stubs: ['policy']
  })
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
