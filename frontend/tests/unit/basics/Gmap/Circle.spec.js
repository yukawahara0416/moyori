import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import Component from '@/basics/Gmap/Circle.vue'

const vuetify = new Vuetify()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    vuetify,
    stubs: ['GmapCircle']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('props', () => {
  it('propsを受け取れるか', () => {
    wrapper.setProps({
      currentCenter: { lat: 35.68, lng: 139.76 }
    })
    expect(wrapper.vm.$props.currentCenter).toStrictEqual({
      lat: 35.68,
      lng: 139.76
    })
  })

  it('typeはObjectか', () => {
    wrapper.setProps({
      currentCenter: { lat: 35.68, lng: 139.76 }
    })
    expect(wrapper.vm.$props.currentCenter instanceof Object).toBe(true)
  })

  it('requireはfalseか', () => {
    wrapper.setProps({
      currentCenter: { lat: 35.68, lng: 139.76 }
    })
    expect(wrapper.vm.$options.props.currentCenter.required).toBe(false)
  })
})
