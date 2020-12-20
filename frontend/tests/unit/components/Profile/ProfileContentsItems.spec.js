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
      posts: [{ data: 'posts' }],
      wifi_withs: [{ data: 'wifi_withs' }],
      power_withs: [{ data: 'power_withs' }],
      comment: [{ data: 'comments' }],
      likes: [{ data: 'likes' }]
    }
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

  it('likes', () => {})
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
