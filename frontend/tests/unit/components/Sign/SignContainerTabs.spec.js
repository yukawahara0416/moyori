import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Sign/SignContainerTabs.vue'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    propsData
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
