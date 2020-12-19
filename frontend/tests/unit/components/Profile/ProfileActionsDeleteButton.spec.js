import { mount, createLocalVue } from '@vue/test-utils'
// import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Component from '@/components/Profile/ProfileActionsDeleteButton.vue'

const localVue = createLocalVue()
// localVue.use(Vuex)
localVue.use(Vuetify)

let wrapper

// let store
let vuetify
// let getters
// let actions
const openDialog = jest.fn()
const closeDialog = jest.fn()

beforeEach(() => {
  // getters = {
  //   dialogProfileDelete: () => true
  // }

  // actions = {
  //   dialogOn: jest.fn(),
  //   dialogOff: jest.fn()
  // }

  // store = new Vuex.Store({
  //   getters,
  //   actions
  // })

  vuetify = new Vuetify()

  wrapper = mount(Component, {
    localVue,
    // store,
    vuetify,
    methods: { openDialog, closeDialog }
  })
})

// afterEach(() => {
//   wrapper.destroy()
// })

// describe('getters', () => {
//   it('dialogProfileDelete', () => {
//     expect(wrapper.vm.dialogProfileDelete).toEqual(
//       getters.dialogProfileDelete()
//     )
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
    // const openDialog = jest.fn()
    // wrapper.setMethods({ dialogOn: event })
    // wrapper.setMethods({ openDialog })
    wrapper.find('.v-btn').trigger('click')
    // expect(event).toHaveBeenCalledTimes(1)
    expect(openDialog).toHaveBeenCalledTimes(1)
  })

  it('$emit.closeDialog', () => {
    // wrapper.setMethods({ nearbySearch: jest.fn() })
    wrapper.vm.$emit('closeDialog')
    expect(wrapper.emitted().closeDialog).toBeTruthy()
  })
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
