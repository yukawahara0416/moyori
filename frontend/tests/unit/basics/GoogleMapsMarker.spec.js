import { shallowMount } from '@vue/test-utils'
import GoogleMapsMarker from '@/basics/GoogleMapsMarker.vue'

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    markers: [
      { name: 'hoge', icon: 'foo' },
      { name: 'fuga', icon: 'bar' }
    ]
  }
  wrapper = shallowMount(GoogleMapsMarker, {
    propsData: propsData,
    stubs: ['gmap-marker']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('props', () => {
  it('markers', () => {
    expect(wrapper.props().markers).toStrictEqual(propsData.markers)
    expect(wrapper.props().markers instanceof Array).toBe(true)
    expect(wrapper.vm.$options.props.markers.required).toBe(false)
  })
})

describe('v-on', () => {
  // it('changeIcon', () => {
  //   const event = jest.fn()
  //   wrapper.setMethods({ changeIcon: event })
  //   wrapper.find('gmap-marker-stub').trigger('click')
  //   expect(event).toHaveBeenCalledTimes(1)
  // })
  // it('panTo', () => {
  //   const event = jest.fn()
  //   wrapper.setMethods({ panTo: event })
  //   wrapper.find('gmap-marker-stub').trigger('click')
  //   expect(event).toHaveBeenCalledTimes(1)
  // })
})

describe('template', () => {
  it('v-for', () => {
    expect(wrapper.findAll('gmap-marker-stub').length).toBe(2)
  })
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
