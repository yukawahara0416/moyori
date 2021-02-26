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
    user: {
      data: { id: 1 },
      posts: [{ data: { id: 1 } }],
      wifi_withs: [{ data: { id: 1 } }],
      wifi_withouts: [{ data: { id: 1 } }],
      power_withs: [{ data: { id: 1 } }],
      power_withouts: [{ data: { id: 1 } }],
      comments: [{ data: { id: 1 } }],
      likes: [{ data: { id: 1 } }]
    }
  }

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
    propsData,
    store
  })
})

describe('props', () => {
  it('user', () => {
    expect(wrapper.vm.$props.user).toEqual(propsData.user)
    expect(wrapper.vm.$props.user instanceof Object).toBeTruthy()
    expect(wrapper.vm.$options.props.user.required).toBeTruthy()
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
    expect(tab.mutations.changeProfileTab).toHaveBeenCalled()
  })

  it('posts', () => {
    expect(wrapper.vm.posts).toMatchObject(propsData.user.posts)
  })

  it('wifi_withs', () => {
    expect(wrapper.vm.wifi_withs).toMatchObject(propsData.user.wifi_withs)
  })

  it('power_withs', () => {
    expect(wrapper.vm.power_withs).toMatchObject(propsData.user.power_withs)
  })

  it('comments', () => {
    expect(wrapper.vm.comments).toMatchObject(propsData.user.comments)
  })

  it('likes', () => {
    expect(wrapper.vm.likes).toMatchObject(propsData.user.likes)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
