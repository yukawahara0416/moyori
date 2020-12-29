import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import snackStore from '@/store/modules/utility/snackbar.js'
import Component from '@/components/Utility/Snackbar.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store

beforeEach(() => {
  store = new Vuex.Store({
    modules: {
      snackbar: snackStore
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    store
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
