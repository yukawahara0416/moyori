import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Component from '@/components/Tutorial/TutorialDialogCarousel.vue'

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
      dialogOff: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      tutorial
    }
  })

  vuetify = new Vuetify()

  wrapper = shallowMount(Component, {
    localVue,
    store,
    vuetify
  })
})

describe('v-on', () => {
  it('click closeTutorial', () => {
    wrapper = mount(Component, {
      localVue,
      store,
      vuetify
    })

    wrapper.find('.v-btn').trigger('click')
    expect(tutorial.mutations.closeTutorial).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
