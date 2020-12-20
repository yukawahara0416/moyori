import { mount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Profile/ProfileActionsEditButton.vue'
// import Vuex from 'vuex'
// import Vuetify from 'vuetify'

const localVue = createLocalVue()
// localVue.use(Vuex)
// localVue.use(Vuetify)

let wrapper

const openDialog = jest.fn()
const closeDialog = jest.fn()

// let store
// let vuetify
// let getters
// let actions

beforeEach(() => {
  // getters = {
  //   dialogProfileEdit: () => true
  // }

  // actions = {
  //   dialogOn: jest.fn(),
  //   dialogOff: jest.fn()
  // }

  // store = new Vuex.Store({
  //   getters,
  //   actions
  // })

  // vuetify = new Vuetify()

  wrapper = mount(Component, {
    localVue,
    methods: { openDialog, closeDialog }
    // store
    // vuetify
  })
})

// afterEach(() => {
//   wrapper.destroy()
// })

// describe('getters', () => {
//   it('dialogProfileEdit', () => {
//     expect(wrapper.vm.dialogProfileEdit).toEqual(getters.dialogProfileEdit())
//   })
// })

// describe('computed', () => {
//   it('dialog', () => {})
// })

describe('v-on', () => {
  // const app = document.createElement('div')
  // app.setAttribute('data-app', true)
  // document.body.append(app)

  it('dialogOn', () => {
    // const event = jest.fn()
    // wrapper.setMethods({ dialogOn: event })
    wrapper.find('.v-btn').trigger('click')
    expect(openDialog).toHaveBeenCalledTimes(1)
  })

  it('$emit.closeDialog', () => {})
})

// describe('actions', () => {
//   it('dialogOn', () => {
//     wrapper.vm.dialogOn()
//     expect(actions.dialogOn).toHaveBeenCalled()
//   })
// })

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
