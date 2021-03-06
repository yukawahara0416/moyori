import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Tutorial/TutorialDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let dialog

beforeEach(() => {
  dialog = {
    getters: {
      dialogTutorial: () => false
    },
    actions: {
      dialogOff: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      dialog
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    store
  })
})

describe('getters', () => {
  it('dialogTutorial', () => {
    expect(wrapper.vm.dialogTutorial).toBe(store.getters.dialogTutorial)
  })
})

describe('computed', () => {
  it('dialog/get', () => {
    expect(wrapper.vm.dialog).toBe(store.getters.dialogTutorial)
  })

  it('dialog/set', () => {
    wrapper.vm.dialog = 'update'
    expect(dialog.actions.dialogOff).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
