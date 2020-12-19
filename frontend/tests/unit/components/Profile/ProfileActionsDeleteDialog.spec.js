import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Profile/ProfileActionsDeleteDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let actions
let store
let auth
let snackbar

beforeEach(() => {
  actions = {
    deleteAccount: jest.fn(),
    dialogOff: jest.fn()
  }

  store = new Vuex.Store({
    modules: {
      auth,
      snackbar
    }
    // actions
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
  it('dialogOff', () => {
    const event = jest.fn()
    wrapper.setMethods({ dialogOff: event })
    wrapper
      .findAll('.v-btn')
      .at(0)
      .trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })

  it('deleteAccount, dialogOff', () => {
    const event1 = jest.fn()
    const event2 = jest.fn()
    wrapper.setMethods({ dialogOff: event1, deleteAccount: event2 })
    wrapper
      .findAll('.v-btn')
      .at(1)
      .trigger('click')
    expect(event1).toHaveBeenCalledTimes(1)
    expect(event2).toHaveBeenCalledTimes(1)
  })
})

describe('actions', () => {
  it('dialogOff', () => {
    wrapper.vm.dialogOff()
    expect(actions.dialogOff).toHaveBeenCalled()
  })
  it('deleteAccount', () => {
    wrapper.vm.deleteAccount()
    expect(actions.deleteAccount).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
