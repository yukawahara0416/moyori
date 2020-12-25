import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Sign/SignContainerTabItems.vue'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {})
})

// describe('computed', () => {
//   it('childTabs', () => {})
// })

// describe('emit', () => {
//   it('childTabs', () => {})
// })

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
