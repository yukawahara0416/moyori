import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Component from '@/components/Header/HeaderTutorialButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

let wrapper
let store
let dialog
let vuetify

beforeEach(() => {
  dialog = {
    mutations: {
      dialogOn: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      dialog
    }
  })

  vuetify = new Vuetify()

  wrapper = mount(Component, {
    localVue,
    store,
    vuetify
  })
})

describe('v-on', () => {
  it('click', () => {
    wrapper.find('.v-btn').trigger('click')
    expect(dialog.mutations.dialogOn).toHaveBeenCalledWith(
      expect.any(Object),
      'dialogTutorial'
    )
  })
})
