import Vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import Component from '@/basics/Gmap/Circle.vue'

const vuetify = new Vuetify()
const sel = id => `[data-test="${id}"]`

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
      currentCenter: { lat: '13', lng: '14' }
    })
    expect(wrapper.vm.$props.currentCenter).toStrictEqual({
      lat: '13',
      lng: '14'
    })
  })

  it('typeはObjectか', () => {
    wrapper.setProps({
      currentCenter: { lat: '13', lng: '14' }
    })
    expect(typeof wrapper.vm.$props.currentCenter).toBe('object')
  })

  it('requireはfalseか', () => {
    wrapper.setProps({
      currentCenter: { lat: '13', lng: '14' }
    })
    expect(wrapper.vm.$options.props.currentCenter.required).toBe(false)
  })
})
