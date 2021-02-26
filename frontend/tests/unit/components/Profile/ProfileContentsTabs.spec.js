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
      profileTab: () => 'posts'
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
    store
  })
})

describe('getters', () => {
  it('profileTab', () => {
    expect(wrapper.vm.profileTab).toEqual(store.getters.profileTab)
  })
})

describe('computed', () => {
  it('childTabs/get', () => {
    expect(wrapper.vm.childTabs).toEqual(store.getters.profileTab)
  })

  it('childTabs/set', () => {
    wrapper.vm.childTabs = 'update'
    expect(tab.mutations.changeProfileTab).toHaveBeenCalledWith(
      expect.any(Object),
      'update'
    )
  })
})

describe('template', () => {
  const tabList = [
    { name: 'posts', icon: 'mdi-map-marker-outline' },
    { name: 'wifi_withs', icon: 'mdi-wifi' },
    { name: 'wifi_withouts', icon: 'mdi-wifi-off' },
    { name: 'power_withs', icon: 'mdi-power-plug' },
    { name: 'power_withouts', icon: 'mdi-power-plug-off' },
    { name: 'comments', icon: 'mdi-message-outline' },
    { name: 'likes', icon: 'mdi-heart-outline' }
  ]
  it(':href', () => {
    for (let i = 0; i < tabList.length; i++) {
      expect(
        wrapper
          .findAll('v-tab-stub')
          .at(i)
          .attributes().href
      ).toEqual(`#${tabList[i].name}`)
    }
  })

  it('tab.icon', () => {
    for (let i = 0; i < tabList.length; i++) {
      expect(
        wrapper
          .findAll('v-icon-stub')
          .at(i)
          .text()
      ).toEqual(tabList[i].icon)
    }
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
