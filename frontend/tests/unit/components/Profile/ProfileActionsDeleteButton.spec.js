import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Component from '@/components/Profile/ProfileActionsDeleteButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

let wrapper

let store
let vuetify
let getters
let actions

beforeEach(() => {
  getters = {
    dialogProfileDelete: () => true
  }

  actions = {
    dialogOn: jest.fn(),
    dialogOff: jest.fn()
  }

  store = new Vuex.Store({
    getters,
    actions
  })

  vuetify = new Vuetify()

  wrapper = mount(Component, {
    localVue,
    store,
    vuetify
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('getters', () => {
  it('dialogProfileDelete', () => {
    expect(wrapper.vm.dialogProfileDelete).toEqual(
      getters.dialogProfileDelete()
    )
  })
})

// describe('computed', () => {
//   it('dialog', () => {})
// })

describe('v-on', () => {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.append(app)

  it('dialogOn', () => {
    const event = jest.fn()
    wrapper.setMethods({ dialogOn: event })
    wrapper.find('.v-btn').trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('actions', () => {
  it('dialogOn', () => {
    wrapper.vm.dialogOn()
    expect(actions.dialogOn).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
