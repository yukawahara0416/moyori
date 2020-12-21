import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Header/HeaderTutorialButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let dialog

beforeEach(() => {
  dialog = {
    mutations: {
      dialogOn: jest.fn('dialogTutorial')
    }
  }

  store = new Vuex.Store({
    modules: {
      dialog
    }
  })

  wrapper = mount(Component, {
    localVue,
    store
  })
})

describe('v-on', () => {
  it('click', () => {
    wrapper.find('.v-btn').trigger('click')
    expect(dialog.mutations.dialogOn).toHaveBeenCalled()
  })
})
