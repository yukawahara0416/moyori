import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Profile/ProfileContentsTabs.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let tab

beforeEach(() => {
  tab = {
    getters: {
      profileTab: () => 'test'
    }
  }

  store = new Vuex.Store({
    modules: {
      tab
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    store
  })
})

describe('getters', () => {
  it('profileTab', () => {
    expect(wrapper.vm.profileTab).toEqual(tab.getters.profileTab())
  })
})

describe('computed', () => {
  it('childTabs/get', () => {
    expect(wrapper.vm.childTabs).toEqual(tab.getters.profileTab())
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
