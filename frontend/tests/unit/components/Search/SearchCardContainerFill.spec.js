import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Search/SearchCardContainerFill.vue'

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spots: []
  }

  wrapper = shallowMount(Component, {
    propsData
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('props', () => {
  it('spots', () => {
    expect(wrapper.props().spots).toStrictEqual(propsData.spots)
    expect(wrapper.props().spots instanceof Array).toBe(true)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
