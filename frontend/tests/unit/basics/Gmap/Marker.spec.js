import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import Component from '@/basics/Gmap/Marker.vue'

const vuetify = new Vuetify()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    vuetify,
    stubs: ['GmapMarker']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('props', () => {
  it('propsを受け取れるか', () => {
    wrapper.setProps({
      markers: ['hoge']
    })
    expect(wrapper.vm.$props.markers).toStrictEqual(['hoge'])
  })

  it('typeはArrayか', () => {
    wrapper.setProps({
      markers: ['hoge']
    })
    expect(wrapper.vm.$props.markers instanceof Array).toBe(true)
  })

  it('requireはfalseか', () => {
    wrapper.setProps({
      markers: ['hoge']
    })
    expect(wrapper.vm.$options.props.markers.required).toBe(false)
  })
})
