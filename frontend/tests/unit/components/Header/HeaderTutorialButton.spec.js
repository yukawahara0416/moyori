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
  it('v-btn has small', () => {
    const xsAndDown = wrapper.vm.$vuetify.breakpoint.thresholds.xs - 1
    Object.assign(window, { innerWidth: xsAndDown })

    wrapper = mount(Component, {
      localVue,
      vuetify
    })

    expect(wrapper.find('.v-btn').classes()).toContain('v-size--small')
    expect(wrapper.html()).not.toContain('使い方')

    Object.assign(window, { innerWidth: 1024 })
  })

  it('v-btn not has small', () => {
    const smAndUp = wrapper.vm.$vuetify.breakpoint.thresholds.sm + 1
    Object.assign(window, { innerWidth: smAndUp })

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
