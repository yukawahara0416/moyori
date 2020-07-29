import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Sign/SignContainerTabs.vue'

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    tabs: 'tab-1'
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
})

// describe('computed', () => {
//   it('childTabs', () => {})
// })

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
