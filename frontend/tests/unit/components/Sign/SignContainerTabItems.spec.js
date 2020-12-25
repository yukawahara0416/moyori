import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignContainerTabItems.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let tab

beforeEach(() => {
  tab = {
    getters: {
      signTab: () => 'signin'
    },
    mutations: {
      changeSignTab: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      tab
    }
  })

  wrapper = shallowMount(Component, {
    localVue
  })
})

// describe('computed', () => {
//   it('childTabs', () => {})
// })

// describe('emit', () => {
//   it('childTabs', () => {})
// })

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
