import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Profile/ProfileActionsSignOutButton.spec.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let actions
let store

beforeEach(() => {
  actions = {
    signOut: jest.fn()
  }

  store = new Vuex.Store({
    actions
  })

  wrapper = mount(Component, {
    localVue,
    store
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  it('signOut', () => {
    const event = jest.fn()
    wrapper.setMethods({ signOut: event })
    wrapper.find('.v-btn').trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('actions', () => {
  it('signOut', () => {
    wrapper.vm.signOut()
    expect(actions.signOut).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
