import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Profile/ProfileActionsEditDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let actions
let store
let auth

beforeEach(() => {
  actions = {
    updateAccount: jest.fn(),
    dialogOff: jest.fn()
  }

  auth = {
    getters: {
      headers: () => {}
    }
  }

  store = new Vuex.Store({
    actions,
    modules: {
      auth
    }
  })

  wrapper = mount(Component, {
    localVue,
    store
  })
})

// afterEach(() => {
//   wrapper.destroy()
// })

// describe('v-on', () => {
//   it('dialogOff', () => {
//     const event = jest.fn()
//     wrapper.setMethods({ dialogOff: event })
//     wrapper
//       .findAll('.v-btn')
//       .at(0)
//       .trigger('click')
//     expect(event).toHaveBeenCalledTimes(1)
//   })
//   it('updateAccount, dialogOff', () => {
//     const event1 = jest.fn()
//     const event2 = jest.fn()
//     wrapper.setMethods({ updateAccount: event1, dialogOff: event2 })
//     wrapper
//       .findAll('.v-btn')
//       .at(1)
//       .trigger('click')
//     // expect(event1).toHaveBeenCalledTimes(1)
//     expect(event2).toHaveBeenCalledTimes(1)
//   })
// })

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toEqual(auth.getters.headers())
  })
})

// describe('actions', () => {
//   // it('updateAccount', () => {
//   //   wrapper.vm.updateAccount()
//   //   expect(actions.updateAccount).toHaveBeenCalled()
//   // })
//   it('dialogOff', () => {
//     wrapper.vm.dialogOff()
//     expect(actions.dialogOff).toHaveBeenCalled()
//   })
// })

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
