import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignTabs.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let tab

beforeEach(() => {
  tab = {
    getters: {
      signTab: () => 'signup'
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
  it('childTab/get', () => {
    expect(wrapper.vm.childTab).toEqual(store.getters.signTab)
  })

  it('childTab/set', () => {
    wrapper.vm.childTab = 'signin'
    expect(tab.mutations.changeSignTab).toHaveBeenCalledWith(
      expect.any(Object),
      'signin'
    )
  })
})

describe('template', () => {
  it('v-tabs has value', () => {
    expect(wrapper.find('v-tabs-stub').attributes().value).toEqual(
      store.getters.signTab
    )
  })
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
