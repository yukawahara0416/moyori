import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Map/MapContainerCircle.vue'

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    center: { lat: 36.204824, lng: 138.252923 }
  }

  wrapper = shallowMount(Component, {
    propsData,
    stubs: ['gmap-circle']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('props', () => {
  it('center', () => {
    expect(wrapper.props().center).toStrictEqual(propsData.center)
    expect(wrapper.props().center instanceof Object).toBe(true)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
