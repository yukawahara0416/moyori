import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Profile/ProfileContentsItems.vue'
import CardContainer from '@/components/Card/CardContainer.vue'

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
    expect(tab.mutations.changeProfileTab).toHaveBeenCalledWith(
      expect.any(Object),
      'update'
    )
  })

  it('posts return filledData', () => {
    expect(wrapper.vm.posts).toMatchObject(wrapper.vm.$props.user.posts)
  })

  it('posts return []', () => {
    wrapper.setProps({ user: { posts: [] } })
    expect(wrapper.vm.posts).toMatchObject([])
  })

  it('wifi_withs return filledData', () => {
    expect(wrapper.vm.wifi_withs).toMatchObject(
      wrapper.vm.$props.user.wifi_withs
    )
  })

  it('wifi_withs return []', () => {
    wrapper.setProps({ user: { wifi_withs: [] } })
    expect(wrapper.vm.wifi_withs).toMatchObject([])
  })

  it('power_withs return filledData', () => {
    expect(wrapper.vm.power_withs).toMatchObject(
      wrapper.vm.$props.user.power_withs
    )
  })

  it('power_withs return []', () => {
    wrapper.setProps({ user: { power_withs: [] } })
    expect(wrapper.vm.power_withs).toMatchObject([])
  })

  it('comments return filledData', () => {
    expect(wrapper.vm.comments).toMatchObject(wrapper.vm.$props.user.comments)
  })

  it('comments return []', () => {
    wrapper.setProps({ user: { comments: [] } })
    expect(wrapper.vm.comments).toMatchObject([])
  })

  it('likes return filledData', () => {
    expect(wrapper.vm.likes).toMatchObject(wrapper.vm.$props.user.likes)
  })

  it('likes return []', () => {
    wrapper.setProps({ user: { likes: [] } })
    expect(wrapper.vm.likes).toMatchObject([])
  })
})

describe('template', () => {
  it('should ', () => {
    const target = wrapper.findAll(CardContainer)

    expect(target.at(0).props().spots).toMatchObject(
      wrapper.vm.$props.user.posts
    )
    expect(target.at(1).props().spots).toMatchObject(
      wrapper.vm.$props.user.wifi_withs
    )
    expect(target.at(2).props().spots).toMatchObject(
      wrapper.vm.$props.user.wifi_withouts
    )
    expect(target.at(3).props().spots).toMatchObject(
      wrapper.vm.$props.user.power_withs
    )
    expect(target.at(4).props().spots).toMatchObject(
      wrapper.vm.$props.user.power_withouts
    )
    expect(target.at(5).props().spots).toMatchObject(
      wrapper.vm.$props.user.comments
    )
    expect(target.at(6).props().spots).toMatchObject(
      wrapper.vm.$props.user.likes
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
