import { shallowMount } from '@vue/test-utils'
import Component from '@/basics/GoogleMapsCircle.vue'

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    mapCenter: { lat: 35.68, lng: 139.76 }
  }
  wrapper = shallowMount(Component, {
    propsData,
    stubs: ['GmapCircle']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('props', () => {
  it('mapCenter', () => {
    expect(wrapper.props().mapCenter).toStrictEqual(propsData.mapCenter)
    expect(wrapper.props().mapCenter instanceof Object).toBe(true)
    expect(wrapper.vm.$options.props.mapCenter.required).toBe(false)
  })
})
