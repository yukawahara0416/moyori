import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Profile/ProfileContentsTabItems.vue'

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    tabs: 'tab-1',
    user: { data: { id: 1 }, posts: [{ data: { id: 1 } }] }
  }

  wrapper = shallowMount(Component, {
    propsData
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('props', () => {
  it('tabs', () => {
    expect(wrapper.props().tabs).toEqual(propsData.tabs)
  })
  it('user', () => {
    expect(wrapper.props().user).toEqual(propsData.user)
  })
})

// describe('computed', () => {
//   it('childTabs', () => {})
// })

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
