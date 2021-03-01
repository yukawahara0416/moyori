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

describe('template', () => {
  it('vuetify.breakpoint.smAndDown', () => {
    Object.assign(window, { innerWidth: 599 })

    wrapper = mount(Component, {
      localVue,
      vuetify
    })

    console.log(wrapper.html())
    console.log(wrapper.vm.$vuetify.breakpoint.thresholds.xs)

    expect(wrapper.find('.v-btn').classes()).toContain('v-size--small')
    expect(wrapper.html()).not.toContain('使い方')

    Object.assign(window, { innerWidth: 1024 })
  })

  it('vuetify.breakpoint.smAndUp', () => {
    Object.assign(window, { innerWidth: 961 })

    wrapper = mount(Component, {
      localVue,
      vuetify
    })

    expect(wrapper.find('.v-btn').classes()).toContain('v-size--default')
    expect(wrapper.html()).toContain('使い方')

    Object.assign(window, { innerWidth: 1024 })
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
