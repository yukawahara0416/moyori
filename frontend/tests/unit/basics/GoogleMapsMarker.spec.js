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
    stubs: {
      GmapMarker: '<div class="test" />'
    }
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
  it('changeIcon', () => {
    const event = jest.fn()
    wrapper.setMethods({ changeIcon: event })
    wrapper.find('.test').trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })

  it('panTo', () => {
    const event1 = jest.fn()
    const event2 = jest.fn()
    wrapper.setMethods({ panTo: event1 })
    wrapper.setMethods({ changeIcon: event2 })
    // wrapper.find('.test').trigger('click')
    wrapper.vm.$on('v-btn:clicked', event1)
    wrapper.trigger('click')
    expect(event1).toHaveBeenCalledTimes(1)
  })
})

describe('template', () => {
  it('v-for', () => {
    expect(wrapper.findAll('.test').length).toBe(2)
  })
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
