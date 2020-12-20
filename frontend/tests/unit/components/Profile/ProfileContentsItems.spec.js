import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Profile/ProfileContentsItems.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let tab

beforeEach(() => {
  propsData = {
    user: { data: { id: 1 } }
  }

  tab = {
    getters: {
      profileTab: () => 'test'
    },
    mutations: {
      changeProfileTab: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      tab
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store
  })
})

describe('props', () => {
  it('user', () => {
    expect(wrapper.props().user).toEqual(propsData.user)
    expect(wrapper.props().user instanceof Object).toBe(true)
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

  it('childTabs/set', () => {
    wrapper.vm.childTabs = 'update'
    expect(tab.mutations.changeProfileTab).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
