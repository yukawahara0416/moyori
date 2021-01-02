import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignTabitems.vue'

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
    localVue,
    store
  })
})

describe('getters', () => {
  it('signTab', () => {
    expect(wrapper.vm.signTab).toEqual(store.getters.signTab)
  })
})

describe('computed', () => {
  it('childTabs/get', () => {
    expect(wrapper.vm.childTab).toEqual(store.getters.signTab)
  })

  it('childTabs/set', () => {
    wrapper.vm.childTab = 'update'
    expect(tab.mutations.changeSignTab).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
